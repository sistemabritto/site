const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const path=require('node:path');
function load(file, deps={}) {
 const source=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const sandbox={exports:{},process:{env:{EVOCRM_API_TOKEN:'test',SUPABASE_SERVICE_KEY:'test',NEXT_PUBLIC_SUPABASE_URL:'https://test.invalid'}},AbortSignal,console:{error(){}},...deps};
 vm.runInNewContext(code,sandbox);return sandbox.exports;
}
const options={phone:'+5571999998888',email:'',pipeline:'pipeline',stage:'stage',fields:{source:'aula'}};
test('existing phone contact gets a real opportunity without identity mutation',async()=>{
 const calls=[];
 const api=load('lib/lead-crm.ts',{fetch:async(url,init)=>{
  calls.push({url,init});
  if(url.includes('/contacts/search'))return {ok:true,json:async()=>({data:[{id:'contact',phone_number:'+557199998888'}]})};
  if(init.method==='POST')return {ok:true,json:async()=>({data:{id:'deal'}})};
  return {ok:true,json:async()=>({data:[]})};
 }});
 assert.equal(await api.attachExistingCrmLead(options,'test'),'saved');
 assert.equal(calls.filter(c=>c.init.method==='POST').length,1);
 assert.equal(JSON.parse(calls.at(-1).init.body).item_id,'contact');
 assert(!calls.some(c=>c.url.includes('messages')));
});
test('existing active opportunity is reused without moving stage or overwriting attribution',async()=>{
 const api=load('lib/lead-crm.ts',{fetch:async(url,init)=>{
  assert.notEqual(init.method,'POST');
  return {ok:true,json:async()=>({data:url.includes('search')?[{id:'c',phone_number:options.phone}]:[{id:'d',contact_id:'c',completed_at:null}]})};
 }});
 assert.equal(await api.attachExistingCrmLead(options,'test'),'saved');
});
test('a failed search is not permission to create duplicate contacts',async()=>{
 const api=load('lib/lead-crm.ts',{fetch:async()=>({ok:false,json:async()=>({error:'unavailable'})})});
 assert.equal(await api.attachExistingCrmLead(options,'test'),'failed');
});
test('generic failed create is not reported as saved',async()=>{
 const api=load('lib/lead-crm.ts',{fetch:async(url,init)=>({ok:init.method!=='POST',json:async()=>({data:url.includes('search')?[{id:'c',phone_number:options.phone}]:[]})})});
 assert.equal(await api.attachExistingCrmLead(options,'test'),'failed');
});
test('phone-only persistence uses a nonempty unique internal email and preserves first touch',async()=>{
 let saved;
 const api=load('pages/api/leads.ts',{require:(name)=>{
  if(name.includes('lead-crm'))return {attachExistingCrmLead:async()=> 'saved'};
  if(name==='@supabase/supabase-js')return {createClient:()=>({from:()=>({upsert:async(data,opts)=>{saved={data,opts};return {error:null}}})})};
  throw new Error(name);
 }});
 const res={status(n){this.code=n;return this},json(v){this.body=v;return this}};
 await api.default({method:'POST',body:{name:'QA',whatsapp:'5571999998888',source:'aula-vps-crm-do-zero'}},res);
 assert.equal(res.code,200);assert.equal(res.body.success,true);
 assert.equal(saved.data.email,'whatsapp-5571999998888@sem-email.sistemabritto.com.br');
 assert.equal(saved.opts.onConflict,'email');assert.equal(saved.opts.ignoreDuplicates,true);
});
test('both storage failures return failure, not a phantom lead',async()=>{
 const api=load('pages/api/leads.ts',{require:name=>name.includes('lead-crm')?{attachExistingCrmLead:async()=> 'failed'}:{createClient:()=>({from:()=>({upsert:async()=>({error:{code:'failure'}})})})}});
 const res={status(n){this.code=n;return this},json(v){this.body=v;return this}};
 await api.default({method:'POST',body:{whatsapp:'5571999998888'}},res);
 assert.equal(res.code,500);assert(!res.body.success);
});

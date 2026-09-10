const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../pages/api/otp/verify.ts'),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
async function run({used=false,failRead=false,failConsume=false,race=false,body={phone:'5571999998888',otp:'123456'}}={}) {
 const calls=[];let query=0;
 const record={id:'otp',code_hash:'hash',attempts:0,expires_at:new Date(Date.now()+60000).toISOString(),used_at:used?'2026-09-10':null};
 const client={from(){query++;const current=query;const chain={};
  for(const op of ['select','eq','is','order','limit','update','gt'])chain[op]=(...args)=>{calls.push({query:current,op,args});return chain};
  chain.maybeSingle=async()=> current===1?{data:record,error:failRead?{}:null}:{data:race?null:{id:'otp'},error:failConsume?{}:null};return chain;
 }};
 const sandbox={exports:{},process:{env:{SUPABASE_SERVICE_KEY:'test'}},console,require:name=>{
  if(name==='@supabase/supabase-js')return {createClient:()=>client};
  if(name.includes('crypto'))return {verificarCodigoOtp:()=>true};
  return {validarTelefoneBrasil:p=>p,OTP_MAX_TENTATIVAS:5};
 }};vm.runInNewContext(code,sandbox);
 const res={status(n){this.code=n;return this},json(v){this.body=v;return this},setHeader(){}};
 await sandbox.exports.default({method:'POST',body},res);return {res,calls};
}
test('only returns success after atomic consumption',async()=>{
 const {res,calls}=await run();assert.equal(res.code,200);
 assert(calls.some(c=>c.query===2&&c.op==='is'&&c.args[0]==='used_at'));
 assert(calls.some(c=>c.query===2&&c.op==='eq'&&c.args[0]==='attempts'));
 assert(!calls.some(c=>c.query===1&&c.op==='is')); // Never fall back to older unused codes.
});
test('consumption write failure never returns success',async()=>assert.equal((await run({failConsume:true})).res.code,503));
test('a losing concurrent verification is rejected',async()=>assert.equal((await run({race:true})).res.code,400));
test('latest consumed code does not fall back to old code',async()=>assert.equal((await run({used:true})).res.code,400));
test('database lookup failure is unavailable, not successful verification',async()=>assert.equal((await run({failRead:true})).res.code,503));
test('non-string OTP cannot bypass input validation',async()=>assert.equal((await run({body:{phone:'5571999998888',otp:123456}})).res.code,400));

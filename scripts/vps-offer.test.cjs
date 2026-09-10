const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../lib/vps-offer.ts'),'utf8');
const sandbox={exports:{}};
vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,sandbox);
const {VPS_OFFER,vpsSupportUrl}=sandbox.exports;
test('preserves existing product slugs and monthly prices',()=>{
 assert.equal(VPS_OFFER.basePrice,297);assert.equal(VPS_OFFER.basePrice+VPS_OFFER.supportPrice,547);
 assert.equal(VPS_OFFER.baseProduct,'vps-gerenciada');assert.equal(VPS_OFFER.supportProduct,'vps-gerenciada-combo-suporte');
});
test('WhatsApp message has real newlines and no silently copied customer data',()=>{
 const url=new URL(vpsSupportUrl(true));assert.equal(url.host,'wa.me');
 const text=url.searchParams.get('text');assert(text.includes('\n'));assert(!text.includes('%0A'));
 assert(text.includes('com suporte técnico'));assert(!text.includes('@'));
});

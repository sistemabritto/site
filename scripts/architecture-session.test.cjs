const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ts=require('typescript');
const file=path.join(__dirname,'../lib/architecture-session.ts');
const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const sandbox={exports:{},URL};vm.runInNewContext(compiled,sandbox);
const {ARCHITECTURE_SESSION,architectureCheckoutUrl}=sandbox.exports;
test('session uses the existing architecture checkout',()=>{
 assert.equal(ARCHITECTURE_SESSION.checkoutUrl,'https://pay.cakto.com.br/35xvemn');
 assert.equal(ARCHITECTURE_SESSION.price,150);
});
test('preserves originating source, campaign and magnet content',()=>{
 const url=new URL(architectureCheckoutUrl({utm_source:'instagram',utm_medium:'lead_magnet',utm_campaign:'visibilidade-v3',utm_content:'guia-ia-v3'}));
 assert.equal(url.searchParams.get('utm_source'),'instagram');
 assert.equal(url.searchParams.get('utm_content'),'guia-ia-v3');
 assert.equal(url.searchParams.get('utm_campaign'),'visibilidade-v3');
});
test('does not copy arbitrary form data or change the checkout host',()=>{
 const url=new URL(architectureCheckoutUrl({email:'private@example.invalid',redirect:'https://example.invalid',utm_term:'dono & gestor'}));
 assert.equal(url.host,'pay.cakto.com.br');
 assert.equal(url.searchParams.has('email'),false);
 assert.equal(url.searchParams.has('redirect'),false);
 assert.equal(url.searchParams.get('utm_term'),'dono & gestor');
 assert.equal(url.searchParams.get('utm_content'),'sessao-arquitetura');
});
test('both service pages share the same checkout configuration',()=>{
 const source=fs.readFileSync(path.join(__dirname,'../components/VibeSellerLanding.tsx'),'utf8');
 assert.equal((source.match(/checkoutUrl: ARCHITECTURE_SESSION.checkoutUrl/g)||[]).length,2);
});

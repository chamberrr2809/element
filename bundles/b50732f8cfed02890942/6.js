(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1474:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var r,n=a(17),s=a.n(n),o=a(350),i=a.n(o),l=a(87),c=a.n(l),p=a(0),h=a(88),u=a(563),d=a(101);!function(e){e.Edit="edit",e.Exporting="exporting"}(r||(r={}));class m extends c.a.Component{constructor(e){super(e),s()(this,"unmounted",!1),s()(this,"passphrase1",Object(l.createRef)()),s()(this,"passphrase2",Object(l.createRef)()),s()(this,"onPassphraseFormSubmit",e=>{e.preventDefault();const t=this.passphrase1.current.value;return t!==this.passphrase2.current.value?(this.setState({errStr:Object(h.a)("Passphrases must match")}),!1):t?(this.startExport(t),!1):(this.setState({errStr:Object(h.a)("Passphrase must not be empty")}),!1)}),s()(this,"onCancelClick",e=>(e.preventDefault(),this.props.onFinished(!1),!1)),this.state={phase:r.Edit,errStr:null}}componentWillUnmount(){this.unmounted=!0}startExport(e){Promise.resolve().then(()=>this.props.matrixClient.exportRoomKeys()).then(t=>u.b(JSON.stringify(t),e)).then(e=>{const t=new Blob([e],{type:"text/plain;charset=us-ascii"});i.a.saveAs(t,"element-keys.txt"),this.props.onFinished(!0)}).catch(e=>{if(p.a.error("Error exporting e2e keys:",e),this.unmounted)return;const t=e.friendlyText||Object(h.a)("Unknown error");this.setState({errStr:t,phase:r.Edit})}),this.setState({errStr:null,phase:r.Exporting})}render(){const e=this.state.phase===r.Exporting;return c.a.createElement(d.a,{className:"mx_exportE2eKeysDialog",onFinished:this.props.onFinished,title:Object(h.a)("Export room keys")},c.a.createElement("form",{onSubmit:this.onPassphraseFormSubmit},c.a.createElement("div",{className:"mx_Dialog_content"},c.a.createElement("p",null,Object(h.a)("This process allows you to export the keys for messages you have received in encrypted rooms to a local file. You will then be able to import the file into another Matrix client in the future, so that client will also be able to decrypt these messages.")),c.a.createElement("p",null,Object(h.a)("The exported file will allow anyone who can read it to decrypt any encrypted messages that you can see, so you should be careful to keep it secure. To help with this, you should enter a passphrase below, which will be used to encrypt the exported data. It will only be possible to import the data by using the same passphrase.")),c.a.createElement("div",{className:"error"},this.state.errStr),c.a.createElement("div",{className:"mx_E2eKeysDialog_inputTable"},c.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},c.a.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},c.a.createElement("label",{htmlFor:"passphrase1"},Object(h.a)("Enter passphrase"))),c.a.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},c.a.createElement("input",{ref:this.passphrase1,id:"passphrase1",autoFocus:!0,size:64,type:"password",disabled:e}))),c.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},c.a.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},c.a.createElement("label",{htmlFor:"passphrase2"},Object(h.a)("Confirm passphrase"))),c.a.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},c.a.createElement("input",{ref:this.passphrase2,id:"passphrase2",size:64,type:"password",disabled:e}))))),c.a.createElement("div",{className:"mx_Dialog_buttons"},c.a.createElement("input",{className:"mx_Dialog_primary",type:"submit",value:Object(h.a)("Export"),disabled:e}),c.a.createElement("button",{onClick:this.onCancelClick,disabled:e},Object(h.a)("Cancel")))))}}},563:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return p}));var r=a(0),n=a(88),s=a(97);const o=window.crypto.subtle||window.crypto.webkitSubtle;function i(e,t){return{message:e,friendlyText:t}}function l(){return Object(n.a)("Your browser does not support the required cryptography extensions")}async function c(e,t){const a=function(e){const t=(new TextDecoder).decode(new Uint8Array(e));let a=0;for(;;){const e=t.indexOf("\n",a);if(e<0)throw new Error("Header line not found");const r=t.slice(a,e).trim();if(a=e+1,r===u)break}const r=a;for(;;){const e=t.indexOf("\n",a);if("-----END MEGOLM SESSION DATA-----"===t.slice(a,e<0?void 0:e).trim())break;if(e<0)throw new Error("Trailer line not found");a=e+1}const n=a;return function(e){const t=window.atob(e),a=new Uint8Array(t.length);for(let e=0;e<t.length;e++)a[e]=t.charCodeAt(e);return a}(t.slice(r,n))}(e),r=s.b.get().brand;if(a.length<1)throw i("Invalid file: too short",Object(n.a)("Not a valid %(brand)s keyfile",{brand:r}));if(1!==a[0])throw i("Unsupported version",Object(n.a)("Not a valid %(brand)s keyfile",{brand:r}));const c=a.length-69;if(c<0)throw i("Invalid file: too short",Object(n.a)("Not a valid %(brand)s keyfile",{brand:r}));const p=a.subarray(1,17),d=a.subarray(17,33),m=a[33]<<24|a[34]<<16|a[35]<<8|a[36],y=a.subarray(37,37+c),w=a.subarray(-32),[b,f]=await h(p,m,t),E=a.subarray(0,-32);let g,x;try{g=await o.verify({name:"HMAC"},f,w,E)}catch(e){throw i("subtleCrypto.verify failed: "+e,l())}if(!g)throw i("hmac mismatch",Object(n.a)("Authentication check failed: incorrect password?"));try{x=await o.decrypt({name:"AES-CTR",counter:d,length:64},b,y)}catch(e){throw i("subtleCrypto.decrypt failed: "+e,l())}return(new TextDecoder).decode(new Uint8Array(x))}async function p(e,t,a){const r=(a=a||{}).kdf_rounds||5e5,n=new Uint8Array(16);window.crypto.getRandomValues(n);const s=new Uint8Array(16);window.crypto.getRandomValues(s),s[8]&=127;const[c,p]=await h(n,r,t),m=(new TextEncoder).encode(e);let y;try{y=await o.encrypt({name:"AES-CTR",counter:s,length:64},c,m)}catch(e){throw i("subtleCrypto.encrypt failed: "+e,l())}const w=new Uint8Array(y),b=1+n.length+s.length+4+w.length+32,f=new Uint8Array(b);let E=0;f[E++]=1,f.set(n,E),E+=n.length,f.set(s,E),E+=s.length,f[E++]=r>>24,f[E++]=r>>16&255,f[E++]=r>>8&255,f[E++]=255&r,f.set(w,E),E+=w.length;const g=f.subarray(0,E);let x;try{x=await o.sign({name:"HMAC"},p,g)}catch(e){throw i("subtleCrypto.sign failed: "+e,l())}const v=new Uint8Array(x);return f.set(v,E),function(e){const t=Math.ceil(e.length/96),a=new Array(t+3);a[0]=u;let r,n=0;for(r=1;r<=t;r++)a[r]=d(e.subarray(n,n+96)),n+=96;return a[r++]="-----END MEGOLM SESSION DATA-----",a[r]="",(new TextEncoder).encode(a.join("\n")).buffer}(f)}async function h(e,t,a){const n=new Date;let s,c;try{s=await o.importKey("raw",(new TextEncoder).encode(a),{name:"PBKDF2"},!1,["deriveBits"])}catch(e){throw i("subtleCrypto.importKey failed: "+e,l())}try{c=await o.deriveBits({name:"PBKDF2",salt:e,iterations:t,hash:"SHA-512"},s,512)}catch(e){throw i("subtleCrypto.deriveBits failed: "+e,l())}const p=new Date;r.a.log("E2e import/export: deriveKeys took "+(p.getTime()-n.getTime())+"ms");const h=c.slice(0,32),u=c.slice(32),d=o.importKey("raw",h,{name:"AES-CTR"},!1,["encrypt","decrypt"]).catch(e=>{throw i("subtleCrypto.importKey failed for AES key: "+e,l())}),m=o.importKey("raw",u,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"]).catch(e=>{throw i("subtleCrypto.importKey failed for HMAC key: "+e,l())});return Promise.all([d,m])}const u="-----BEGIN MEGOLM SESSION DATA-----";function d(e){const t=String.fromCharCode.apply(null,e);return window.btoa(t)}}}]);
//# sourceMappingURL=6.js.map
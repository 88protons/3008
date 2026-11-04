(function(root){
var MUL=6364136223846793005n,INC=105n,MASK=(1n<<64n)-1n;
function draws(seed,n){var st=0n,out=[];function nx(){var o=st;st=(o*MUL+INC)&MASK;var x=Number((((o>>18n)^o)>>27n)&0xffffffffn),r=Number(o>>59n);return((x>>>r)|(x<<((-r)&31)))>>>0}
 nx();st=(st+BigInt.asIntN(32,BigInt(seed)))&MASK;nx();for(var i=0;i<n;i++)out.push(nx()/4294967296);return out}
function isP(x,z){return x>=2&&z>=2&&(x-2)%8===0&&(z-2)%8===0}
var CAFE=[[0,0],[0,1],[0,2],[1,1],[1,2]];
var CAFE_MAX=48/6245,SHELF_MAX=83/6245,SHELF_LEN=4;
function layout(seed,X,Z,pil,opt){opt=opt||{};var slen=opt.shelfLen||function(){return SHELF_LEN};
 var n=X*Z+8,d=draws(seed,4*n+60);var f=function(j){return d[1+2*j]};
 var cov={},bigs=[],cells=[],j=0,unsure=false,killed={},li=0;
 for(var x=1;x<=X;x++)for(var z=1;z<=Z;z++){if(pil&&isP(x,z))continue;var key=x+','+z;if(cov[key])continue;
  var v=f(j);j++;var cell={x:x,z:z,pre:v};cells.push(cell);
  if(v<SHELF_MAX){var fp=[],t;
   if(v<CAFE_MAX){t='cafeteria';var ok=true;fp=CAFE.map(function(o){return[x+o[0],z+o[1]]});for(var i=0;i<fp.length;i++){var q=fp[i];if(q[0]>X||q[1]>Z||cov[q[0]+','+q[1]]||(pil&&isP(q[0],q[1])))ok=false}if(!ok){continue}}
   else{t='industrial shelf';var L=opt.shelfLen?slen(cell,j-1):(4+Math.floor(d[li]*10));var placed=0;for(var i2=0;i2<L;i2++){var q2=[x+i2,z];if(q2[0]>X||cov[q2[0]+','+q2[1]])break;placed++;if(pil&&isP(q2[0],q2[1])){killed[q2[0]+','+q2[1]]=1;continue}fp.push(q2)}li+=2*placed-3;if(!opt.exactLen&&true)unsure=true}
   fp.forEach(function(q){cov[q[0]+','+q[1]]=1});cell.big=t;cell.fp=fp;bigs.push({type:t,anchor:[x,z],cells:fp,v:v,j:j-1})}}
 return {d:d,cells:cells,bigs:bigs,P:j,B:2*j+1,unsureShelf:unsure,cov:cov,killed:killed}}
function plotTypes(L,look,Bforce){var d=L.d,B=Bforce||L.B,s=0,res={},anch={};
 L.bigs.forEach(function(b){anch[b.anchor[0]+','+b.anchor[1]]=1});
 L.cells.forEach(function(c){var key=c.x+','+c.z;if(anch[key])return;var v=d[B+2*s];s++;var th=0;while(v<83/6245&&th<8){v=d[B+2*s];s++;th++}c.v=v;c.thrown=th;c.k=s;res[key]=c});return res}
root.M3008={draws:draws,isP:isP,layout:layout,plotTypes:plotTypes,CAFE:CAFE};
if(typeof module!=='undefined')module.exports=root.M3008;
})(typeof window!=='undefined'?window:globalThis);

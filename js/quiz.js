const Quiz={list:[],i:0,score:0,wrong:[],sel:null,done:false,
 shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a},
 pool(topic,diff){return QUESTIONS.filter(q=>(topic==="mixed"||q.t===topic)&&(diff==="all"||q.d===diff))},
 start(list){this.list=list;this.i=0;this.score=0;this.wrong=[];this.render()},
 $(id){return document.getElementById(id)},
 render(){const q=this.list[this.i],$=this.$;this.sel=null;this.done=false;
  $("setup").hidden=true;$("quiz").hidden=false;
  $("qNum").textContent=`Question ${this.i+1} of ${this.list.length}`;$("score").textContent=`Score: ${this.score}`;
  $("barFill").style.width=(this.i/this.list.length*100)+"%";$("qText").textContent=q.q;
  const box=$("opts");box.innerHTML="";
  q.o.forEach((t,k)=>{const b=document.createElement("button");b.className="opt";b.textContent="ABCD"[k]+") "+t;
   b.onclick=()=>{if(this.done)return;this.sel=k;[...box.children].forEach(c=>c.classList.remove("sel"));b.classList.add("sel");$("submitBtn").disabled=false};box.appendChild(b)});
  $("fb").hidden=true;$("submitBtn").hidden=false;$("submitBtn").disabled=true;$("nextBtn").hidden=true;
  $("nextBtn").textContent=this.i===this.list.length-1?"See Results":"Next Question"},
 submit(){if(this.done||this.sel===null)return;this.done=true;const q=this.list[this.i],$=this.$;
  const ok=this.sel===q.a,kids=[...$("opts").children];kids.forEach(c=>c.disabled=true);
  kids[q.a].classList.add("right");if(!ok){kids[this.sel].classList.add("wrong");this.wrong.push(q)}else this.score++;
  const fb=$("fb");fb.className="fb "+(ok?"ok":"no");fb.hidden=false;
  fb.innerHTML=(ok?"<p><b>✔ Correct!</b></p>":"<p><b>✘ Incorrect.</b></p>")+`<p>Correct answer: <b>${"ABCD"[q.a]}) ${q.o[q.a]}</b></p><p>${q.en}</p>`+(ok?"":`<p lang="ta">${q.ta}</p>`);
  $("score").textContent=`Score: ${this.score}`;$("submitBtn").hidden=true;$("nextBtn").hidden=false},
 next(){if(this.i<this.list.length-1){this.i++;this.render()}else this.finish()},
 finish(){const n=this.list.length,$=this.$;
  $("rScore").textContent=`${this.score} / ${n}`;$("rTotal").textContent=n;$("rRight").textContent=this.score;
  $("rWrong").textContent=n-this.score;$("rAcc").textContent=Math.round(this.score/n*100)+"%";
  $("retryWrong").hidden=!this.wrong.length;show("results")}};

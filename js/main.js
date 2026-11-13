function show(id){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("on",v.id===id));window.scrollTo(0,0)}
function cnt(k){return QUESTIONS.filter(q=>q.t===k).length}
function toPractice(topic){document.getElementById("quiz").hidden=true;document.getElementById("setup").hidden=false;document.getElementById("setupMsg").textContent="";if(topic)document.getElementById("selTopic").value=topic;show("practice")}
document.addEventListener("DOMContentLoaded",()=>{
 const sel=document.getElementById("selTopic");
 sel.innerHTML='<option value="mixed">Mixed Practice (all topics)</option>'+TOPICS.map(t=>`<option value="${t.k}">${t.n}</option>`).join("");
 document.getElementById("homeCards").innerHTML=TOPICS.map(t=>`<div class="card"><h3>${t.n}</h3><p>${cnt(t.k)} questions</p><button class="btn" data-topic="${t.k}">Practise</button></div>`).join("");
 document.getElementById("topicCards").innerHTML=TOPICS.map(t=>`<div class="card"><h3>${t.n}</h3><p>${t.desc}</p><p><b>${cnt(t.k)}</b> questions available</p><button class="btn" data-topic="${t.k}">Practise</button></div>`).join("");
 document.addEventListener("click",e=>{
  const g=e.target.closest("[data-go]"),t=e.target.closest("[data-topic]");
  if(t)toPractice(t.dataset.topic);
  else if(g){e.preventDefault();g.dataset.go==="practice"?toPractice():show(g.dataset.go)}});
 document.getElementById("startBtn").onclick=()=>{
  const topic=sel.value,diff=document.getElementById("selDiff").value,c=document.getElementById("selCount").value;
  let p=Quiz.shuffle(Quiz.pool(topic,diff));
  if(!p.length){document.getElementById("setupMsg").textContent="No questions for this choice yet. Try another level.";return}
  if(c!=="all")p=p.slice(0,+c);Quiz.start(p);show("practice")};
 document.getElementById("submitBtn").onclick=()=>Quiz.submit();
 document.getElementById("nextBtn").onclick=()=>Quiz.next();
 document.getElementById("retryWrong").onclick=()=>{Quiz.start(Quiz.shuffle(Quiz.wrong));show("practice")};
 document.getElementById("restartBtn").onclick=()=>toPractice();
 show("home")});

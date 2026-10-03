document.addEventListener('DOMContentLoaded', function () {
  const questions = {
    'b100':['Begrepp',100,'Vad kallas nedsatt fysisk, psykisk eller intellektuell funktionsförmåga?','Funktionsnedsättning',['funktionsnedsättning']],
    'b200':['Begrepp',200,'Vad uppstår i mötet mellan en person och en otillgänglig miljö?','Funktionshinder',['funktionshinder']],
    'b300':['Begrepp',300,'Vad betyder NPF?','Neuropsykiatriska funktionsnedsättningar',['neuropsykiatriska funktionsnedsättningar','npf']],
    'b400':['Begrepp',400,'Förklara skillnaden mellan funktionsnedsättning och funktionshinder.','En funktionsnedsättning handlar om personens funktionsförmåga. Ett funktionshinder uppstår när omgivningen skapar hinder.',[]],
    'b500':['Begrepp',500,'Varför kan två personer med samma diagnos behöva olika stöd?','En diagnos beskriver inte hela personen. Styrkor, svårigheter och behov varierar mellan individer.',[]],
    'd100':['Diagnoser',100,'Nämn en NPF.','Till exempel ADHD eller autism',['adhd','autism']],
    'd200':['Diagnoser',200,'Vilken NPF kan innebära svårigheter med koncentration och impulskontroll?','ADHD',['adhd']],
    'd300':['Diagnoser',300,'Vilken NPF kan påverka social kommunikation och behov av tydlighet?','Autism',['autism']],
    'd400':['Diagnoser',400,'Varför beskriver en diagnos inte hela personen?','Människor med samma diagnos kan ha olika styrkor, svårigheter och behov.',[]],
    'd500':['Diagnoser',500,'Vad kan bli problemet om personal bara utgår från diagnosen?','Stödet kan bli fel eller stereotypiskt. Individens faktiska behov behöver styra.',[]],
    'u100':['Utredningar',100,'Vilken utredning tittar på lärande och skolsituation?','Pedagogisk utredning',['pedagogisk utredning']],
    'u200':['Utredningar',200,'Vilken utredning undersöker medicinska orsaker?','Medicinsk utredning',['medicinsk utredning']],
    'u300':['Utredningar',300,'Vilken utredning kan undersöka kognitiva förmågor?','Psykologisk utredning',['psykologisk utredning']],
    'u400':['Utredningar',400,'Varför kan flera utredningsperspektiv behövas?','De ger tillsammans en bredare bild av personens styrkor, svårigheter och stödbehov.',[]],
    'u500':['Utredningar',500,'Hur kan pedagogisk och psykologisk utredning komplettera varandra?','Den pedagogiska visar hur lärandet och skolsituationen fungerar. Den psykologiska kan ge kunskap om kognitiva förmågor.',[]],
    'a100':['Anpassningar',100,'Nämn en anpassning för en elev som behöver tydlighet.','Till exempel visuellt schema eller steg-för-steg-instruktion.',['schema','steg för steg','steg-för-steg']],
    'a200':['Anpassningar',200,'Vad kan hjälpa en person som blir stressad av mycket ljud?','Till exempel en lugnare arbetsplats eller hörselkåpor.',['lugn arbetsplats','lugnare arbetsplats','hörselkåpor']],
    'a300':['Anpassningar',300,'En rullstolsanvändare möter en trappa. Nämn en förändring som minskar hindret.','Till exempel hiss, ramp eller tillgänglig lokal.',['hiss','ramp','tillgänglig lokal']],
    'a400':['Anpassningar',400,'Varför innebär en anpassning inte alltid att kraven tas bort?','Man kan ändra vägen till målet utan att ta bort målet, till exempel genom tydligare instruktioner eller lugnare miljö.',[]],
    'a500':['Anpassningar',500,'Ge ett exempel på hur miljön kan skapa ett funktionshinder och hur det kan minskas.','Exempel: En trappa kan hindra en rullstolsanvändare. Ramp eller hiss minskar hindret.',[]],
    'v100':['Vem gör vad?',100,'Vem arbetar med tal, språk och kommunikation?','Logoped',['logoped']],
    'v200':['Vem gör vad?',200,'Vilken funktion i skolan arbetar gemensamt med elevers hälsa och lärande?','Elevhälsan',['elevhälsa','elevhälsan']],
    'v300':['Vem gör vad?',300,'Vart kan barn och unga få specialiststöd vid psykisk ohälsa?','BUP',['bup','barn och ungdomspsykiatrin']],
    'v400':['Vem gör vad?',400,'Varför är samverkan mellan professioner viktig?','Olika professioner bidrar med olika kunskap och kan tillsammans skapa ett mer sammanhängande stöd.',[]],
    'v500':['Vem gör vad?',500,'En elev har svårigheter med språk, lärande och psykiskt mående. Varför kan flera professioner behöva samarbeta?','Behoven finns inom flera områden. Olika professioner kan bidra med olika kunskap och tillsammans skapa ett bättre stöd.',[]]
  };
  let current = null;
  let score = 0;
  const el = id => document.getElementById(id);
  const normalize = text => text.toLowerCase().trim().replace(/[.,!?]/g,'');
  document.querySelectorAll('.tile').forEach(function (button) {
    button.addEventListener('click', function () {
      current = questions[button.dataset.q];
      button.disabled = true;
      el('question').classList.add('show');
      el('meta').textContent = current[0] + ' • ' + current[1] + ' poäng • ' + (current[1] < 400 ? 'Grundnivå' : 'Fördjupning');
      el('qtext').textContent = current[2];
      el('feedback').textContent = '';
      el('feedback').className = 'feedback';
      el('example').classList.add('hidden');
      el('answer').value = '';
      el('reason').value = '';
      el('short').classList.toggle('hidden', current[1] >= 400);
      el('deep').classList.toggle('hidden', current[1] < 400);
      el('question').scrollIntoView({behavior:'smooth',block:'center'});
    });
  });
  el('check').addEventListener('click', function () {
    if (!current) return;
    const value = normalize(el('answer').value);
    if (!value) { el('feedback').textContent = 'Skriv ett svar först.'; return; }
    const correct = current[4].some(function (answer) { return value.includes(normalize(answer)); });
    el('feedback').textContent = correct ? 'Rätt! Du får ' + current[1] + ' poäng.' : 'Inte riktigt. Jämför med rätt svar.';
    el('feedback').className = 'feedback ' + (correct ? 'correct' : 'wrong');
    if (correct) { score += current[1]; el('score').textContent = score; }
    el('example').innerHTML = '<b>Rätt svar:</b> ' + current[3];
    el('example').classList.remove('hidden');
  });
  el('compare').addEventListener('click', function () {
    if (!current) return;
    if (el('reason').value.trim().length < 15) {
      el('feedback').textContent = 'Skriv först en kort förklaring med egna ord.';
      el('feedback').className = 'feedback wrong';
      return;
    }
    el('feedback').textContent = 'Nu kan du jämföra ditt resonemang med exempelsvaret.';
    el('feedback').className = 'feedback correct';
    el('example').innerHTML = '<b>Exempelsvar:</b> ' + current[3] + '<br><br><b>Jämför med ditt svar:</b> Har du förklarat hur eller varför och fått med ett relevant samband?';
    el('example').classList.remove('hidden');
  });
});
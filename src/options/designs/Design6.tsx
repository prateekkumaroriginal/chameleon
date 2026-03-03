import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useRules, useArchivedRules } from "@/hooks/useRules";

const Design6RulesList = () => {
  const { rules, toggle } = useRules();
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between mb-16 gap-8 items-start md:items-center">
        <div>
          <h1 className="text-[6rem] md:text-8xl font-black uppercase tracking-tighter" style={{WebkitTextStroke: '2px #1a1a1a', color: 'transparent'}}>Form+</h1>
          <h1 className="text-[6rem] md:text-8xl font-black uppercase tracking-tighter mt-[-30px] text-[#1e88e5]">Function.</h1>
        </div>
        <div className="flex gap-6">
          <button className="design-6-btn hover:bg-[#e53935] hover:text-white" onClick={() => navigate('archived')}>Archive</button>
          <button className="design-6-btn bg-[#fdd835] hover:bg-[#fdd835]" onClick={() => navigate('new')}>New Object</button>
        </div>
      </header>
      
      <div className="design-6-grid">
        {rules.map((r, i) => {
          const colors = ['bg-red-bauhaus', 'bg-blue-bauhaus', 'bg-yellow-bauhaus'];
          const shapeClass = i % 2 === 0 ? 'rounded-full' : '';
          return (
          <div key={r.id} className="design-6-card" onClick={() => navigate(`edit/${r.id}`)}>
            <div className="flex justify-between items-start">
              <div className={`w-16 h-16 border-4 border-[#1a1a1a] ${colors[i % 3]} ${shapeClass}`}></div>
              <button onClick={(e) => { e.stopPropagation(); toggle(r.id, !r.enabled); }} className={`border-4 border-black px-4 py-1 font-bold ${r.enabled ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-black hover:text-white'}`}>
                {r.enabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="mt-12">
               <h3 className="text-4xl font-black lowercase truncate mb-2">{r.name}</h3>
               <span className="border-b-4 border-black pb-1 font-bold uppercase">{r.domain}</span>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
};

const RuleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [name, setName] = useState(isNew ? "" : "Primary Color Override");
  const [domain, setDomain] = useState(isNew ? "" : "example.test");
  const [cssText, setCssText] = useState(isNew ? "" : "body { background-color: #fdd835; border: 8px solid #1a1a1a; }");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="max-w-5xl mx-auto py-12">
      <header className="flex flex-col md:flex-row justify-between mb-16 gap-8 items-start md:items-end border-b-8 border-[#1a1a1a] pb-8">
        <div>
          <h2 className="text-[4rem] md:text-6xl font-black uppercase tracking-tighter leading-none" style={{WebkitTextStroke: '2px #1a1a1a', color: 'transparent'}}>
             {isNew ? 'Construct' : 'Deconstruct'}
          </h2>
          <h2 className="text-[4rem] md:text-6xl font-black uppercase tracking-tighter leading-none text-[#e53935] mt-[-10px]">
             Object.
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-bold uppercase text-2xl tracking-tighter">Status:</span>
          <button onClick={() => setEnabled(!enabled)} className={`border-4 border-black px-6 py-2 font-black text-2xl uppercase ${enabled ? 'bg-[#1e88e5] text-white box-shadow-[4px_4px_0_#1a1a1a]' : 'bg-transparent text-black box-shadow-[4px_4px_0_#1a1a1a]'}`}>
             {enabled ? 'Active' : 'Halted'}
          </button>
        </div>
      </header>
      
      <div className="design-6-grid bg-[#f8f6f0] border-none p-0 gap-8 grid-cols-1 select-none">
         <div className="design-6-card flex-row gap-8 items-end p-8 min-h-0 bg-[#fdd835]">
            <div className="w-full">
              <label className="block text-2xl font-black uppercase mb-2">Nomenclature</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="design-6-input w-full bg-white" placeholder="Block Name" />
            </div>
            <div className="w-full">
              <label className="block text-2xl font-black uppercase mb-2">Coordinates</label>
              <input type="text" value={domain} onChange={e => setDomain(e.target.value)} className="design-6-input w-full bg-white" placeholder="URL Pattern" />
            </div>
         </div>

         <div className="design-6-card p-8 min-h-0 bg-[#1e88e5]">
            <label className="block text-2xl font-black uppercase mb-2 text-white">Syntax Architecture</label>
            <textarea value={cssText} onChange={e => setCssText(e.target.value)} className="design-6-input w-full h-[400px] font-mono resize-none bg-white p-4" placeholder="/* Inject architectural integrity here */" spellCheck="false" />
         </div>
      </div>

      <div className="flex justify-between items-center mt-12 pt-8 border-t-8 border-[#1a1a1a]">
        <button onClick={() => navigate('..')} className="text-2xl font-black uppercase hover:text-[#e53935] underline decoration-4 underline-offset-8">Abort</button>
        <button onClick={() => navigate('..')} className="design-6-btn bg-[#fdd835] text-2xl hover:bg-[#e53935] hover:text-white">Execute Save</button>
      </div>
    </div>
  );
};

const ArchivedList = () => {
  const { rules } = useArchivedRules();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto py-12">
      <header className="flex flex-col md:flex-row justify-between mb-16 gap-8 items-start md:items-end border-b-8 border-[#1a1a1a] pb-8">
        <div>
          <h2 className="text-[4rem] md:text-8xl font-black uppercase tracking-tighter leading-none text-[#e53935]">
             Archive.
          </h2>
          <h2 className="text-[2rem] md:text-4xl font-black uppercase tracking-tighter leading-none mt-2 opacity-60">
             Discarded Forms
          </h2>
        </div>
        <button onClick={() => navigate('..')} className="design-6-btn bg-white">Return to Grid</button>
      </header>

      <div className="design-6-grid bg-[#e53935]">
        {rules.map(r => {
          return (
          <div key={r.id} className="design-6-card bg-[#f8f6f0] grayscale opacity-70 hover:grayscale-0 hover:opacity-100">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-[#1a1a1a] rounded-sm"></div>
              <div className="flex flex-col gap-2">
                 <button className="border-4 border-black px-4 py-1 font-black uppercase bg-[#1e88e5] text-white text-sm hover:scale-105 transition-transform origin-right">Reconstruct</button>
                 <button className="border-4 border-black px-4 py-1 font-black uppercase bg-[#e53935] text-white text-sm hover:scale-105 transition-transform origin-right">Annihilate</button>
              </div>
            </div>
            <div>
               <h3 className="text-4xl font-black lowercase truncate mb-2 text-[#1a1a1a]">{r.name}</h3>
               <span className="border-b-4 border-black pb-1 font-bold uppercase text-[#1a1a1a]">{r.domain}</span>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default function Design6() {
  return (
    <div className="design-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700;900&display=swap');
        .design-6 { font-family: 'Jost', sans-serif; background-color: #f8f6f0; color: #1a1a1a; min-height: 100vh; padding: 2rem; }
        .design-6-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2px; background: #1a1a1a; border: 8px solid #1a1a1a; }
        .design-6-card { background: #f8f6f0; padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between; min-height: 350px; transition: 0.2s; cursor: pointer; }
        .design-6-card:hover { transform: translate(-8px, -8px); box-shadow: 8px 8px 0 rgba(0,0,0,1); border: 2px solid #1a1a1a; z-index: 10; position: relative; }
        .bg-red-bauhaus { background-color: #e53935; }
        .bg-blue-bauhaus { background-color: #1e88e5; }
        .bg-yellow-bauhaus { background-color: #fdd835; }
        .design-6-btn { border: 4px solid #1a1a1a; border-radius: 0; padding: 0.75rem 2rem; font-weight: 700; font-size: 1.25rem; text-transform: uppercase; cursor: pointer; transition: 0.2s; display: inline-flex; align-items: center; justify-content: center; background: #f8f6f0; color: #1a1a1a; box-shadow: 4px 4px 0 #1a1a1a;}
        .design-6-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #1a1a1a; }
        .design-6-btn:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0 #1a1a1a; }
      `}</style>
      <Routes>
        <Route path="" element={<Design6RulesList />} />
        <Route path="new" element={<RuleEditor />} />
        <Route path="edit/:id" element={<RuleEditor />} />
        <Route path="archived" element={<ArchivedList />} />
      </Routes>
    </div>
  );
}

import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useRules, useArchivedRules } from "@/hooks/useRules";

const Design10RulesList = () => {
  const { rules, toggle } = useRules();
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <header className="design-10-header">
        <h1 className="text-[8vw] leading-none tracking-tighter font-bold">X-CSS</h1>
        <div className="flex gap-4">
          <button className="text-xl underline decoration-2 underline-offset-8 font-bold flex items-center gap-2" onClick={() => navigate('archived')}>Archive</button>
          <button className="design-10-btn" onClick={() => navigate('new')}>New</button>
        </div>
      </header>
      
      <div className="w-full">
         <div className="grid grid-cols-[3fr_2fr_1fr] pb-4 font-bold text-gray-500 uppercase tracking-widest text-sm border-b-2 border-black">
           <div>Identifier</div>
           <div>Target Node</div>
           <div className="text-right">State</div>
         </div>
         {rules.map(r => (
           <div key={r.id} className="design-10-row" onClick={() => navigate(`edit/${r.id}`)}>
             <h3 className="text-4xl font-light tracking-tight">{r.name}</h3>
             <div><span className="design-10-tag">{r.domain}</span></div>
             <div className="text-right" onClick={(e) => { e.stopPropagation(); toggle(r.id, !r.enabled); }}>
               <span className={`design-10-switch ${r.enabled ? 'text-black font-bold' : 'text-gray-300 line-through'}`}>ACTIVE</span>
             </div>
           </div>
         ))}
      </div>
    </div>
  )
};

const RuleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [name, setName] = useState(isNew ? "" : "HIGH CONTRAST MODE");
  const [domain, setDomain] = useState(isNew ? "" : "example.net");
  const [cssText, setCssText] = useState(isNew ? "" : "* { color: #fff !important; background: #000 !important; }");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 flex flex-col gap-12">
      <div className="border-b-8 border-black pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <h2 className="text-[12vw] md:text-[8rem] font-black tracking-tighter uppercase leading-none break-all">
          {isNew ? 'BUILD' : 'EDIT'}
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-black uppercase tracking-tighter">STATE_</span>
          <button 
             onClick={() => setEnabled(!enabled)} 
             className={`px-6 py-2 text-3xl font-black uppercase border-8 transition-colors ${enabled ? 'bg-black text-white border-black hover:bg-white hover:text-black' : 'bg-white text-gray-400 border-gray-400 hover:text-black hover:border-black'}`}
          >
            {enabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <label className="block text-4xl font-black uppercase tracking-tighter mb-2">ID_STRING</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white border-b-8 border-black text-4xl lg:text-6xl font-bold py-4 outline-none uppercase placeholder:text-gray-300 focus:bg-black focus:text-white transition-colors" 
              placeholder="ENTER UNIQUE ID"
            />
          </div>
          <div>
            <label className="block text-4xl font-black uppercase tracking-tighter mb-2">HOSTNAME_</label>
            <input 
              type="text" 
              value={domain}
              onChange={e => setDomain(e.target.value)}
              className="w-full bg-white border-b-8 border-black text-4xl lg:text-6xl font-bold py-4 outline-none lowercase placeholder:text-gray-300 focus:bg-black focus:text-white transition-colors" 
              placeholder="DOMAIN.COM"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-4xl font-black uppercase tracking-tighter mb-2">STYLESHEET_</label>
          <textarea 
            value={cssText}
            onChange={e => setCssText(e.target.value)}
            className="w-full h-[400px] md:h-full min-h-[400px] bg-black text-white p-8 font-mono text-xl md:text-2xl outline-none resize-none placeholder:text-gray-600 focus:ring-8 focus:ring-gray-300 transition-all" 
            placeholder="/* ENTER CSS PAYLOAD */"
            spellCheck="false"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t-8 border-black gap-8">
        <button onClick={() => navigate('..')} className="text-4xl font-black uppercase hover:line-through decoration-8 transition-all">ABORT</button>
        <button onClick={() => navigate('..')} className="text-4xl lg:text-5xl font-black uppercase bg-black text-white py-6 px-16 w-full md:w-auto text-center hover:bg-white hover:text-black border-8 border-black transition-colors">EXECUTE</button>
      </div>
    </div>
  );
};

const ArchivedList = () => {
  const { rules } = useArchivedRules();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto py-12">
       <div className="border-b-8 border-black pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
         <h2 className="text-[15vw] md:text-[10rem] font-black tracking-tighter uppercase leading-none break-all">
           TRASH
         </h2>
         <button onClick={() => navigate('..')} className="text-3xl font-black uppercase hover:underline decoration-8 underline-offset-8">RETURN</button>
       </div>

       <div className="flex flex-col gap-12">
        {rules.map(r => (
          <div key={r.id} className="border-8 border-gray-300 p-8 hover:border-black transition-colors group flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-gray-50 hover:bg-white">
            <div className="flex-1 overflow-hidden">
              <h3 className="text-5xl md:text-7xl font-black uppercase truncate mb-4 tracking-tighter text-gray-400 group-hover:text-black line-through group-hover:no-underline">{r.name}</h3>
              <p className="text-3xl font-bold bg-gray-200 group-hover:bg-black group-hover:text-white px-4 py-2 inline-block uppercase tracking-widest transition-colors">{r.domain}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
               <button className="text-2xl md:text-3xl font-black uppercase border-8 border-black px-8 py-4 bg-white hover:bg-black text-black hover:text-white transition-colors w-full sm:w-auto text-center">RESTORE</button>
               <button className="text-2xl md:text-3xl font-black uppercase border-8 border-red-500 px-8 py-4 bg-white hover:bg-red-500 text-red-500 hover:text-white transition-colors w-full sm:w-auto text-center">PURGE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Design10() {
  return (
    <div className="design-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap');
        .design-10 { font-family: 'Space Grotesk', sans-serif; background-color: #fff; color: #000; min-height: 100vh; padding: 2vw 4vw; display: flex; flex-direction: column; cursor: crosshair; }
        .design-10-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #000; padding-bottom: 2rem; margin-bottom: 4rem; }
        .design-10-hr { border: none; border-top: 1px solid #ccc; margin: 2rem 0; width: 100%; }
        .design-10-row { display: grid; grid-template-columns: 3fr 2fr 1fr; width: 100%; padding: 1.5rem 0; border-bottom: 1px solid #ccc; cursor: pointer; transition: 0.2s; align-items: center; }
        .design-10-row:hover { padding-left: 2rem; padding-right: 2rem; background: #000; color: #fff; }
        .design-10-row:hover .design-10-tag { background: #fff; color: #000; }
        .design-10-row:hover .design-10-switch { color: #fff; }
        .design-10-btn { background: #000; color: #fff; padding: 1rem 3rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
        .design-10-btn:hover { background: #fff; color: #000; box-shadow: inset 0 0 0 2px #000; }
        .design-10-tag { font-family: monospace; padding: 0.4rem 0.8rem; background: #000; color: #fff; font-size: 0.9rem; font-weight: bold; }
        .design-10-switch { font-size: 1.5rem; transition: 0.2s; }
      `}</style>
      <Routes>
        <Route path="" element={<Design10RulesList />} />
        <Route path="new" element={<RuleEditor />} />
        <Route path="edit/:id" element={<RuleEditor />} />
        <Route path="archived" element={<ArchivedList />} />
      </Routes>
    </div>
  );
}

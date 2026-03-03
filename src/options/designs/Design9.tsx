import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useRules, useArchivedRules } from "@/hooks/useRules";
import { Archive, Plus } from "lucide-react";

const Design9RulesList = () => {
  const { rules, toggle } = useRules();
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-16 design-9-neumorphic p-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#2d3748]">Settings</h1>
          <p className="text-[#a0aec0] mt-1 font-medium">Control panel</p>
        </div>
        <div className="flex gap-6">
          <button className="design-9-neumorphic design-9-btn" onClick={() => navigate('archived')}><Archive /></button>
          <button className="design-9-neumorphic design-9-btn text-teal-600" onClick={() => navigate('new')}><Plus size={28} /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {rules.map(r => (
          <div key={r.id} className="design-9-neumorphic design-9-card flex justify-between items-center cursor-pointer" onClick={() => navigate(`edit/${r.id}`)}>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-[#2d3748]">{r.name}</h3>
              <div className="design-9-neumorphic-inset px-4 py-1 text-sm inline-block text-[#718096] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                {r.domain}
              </div>
            </div>
            <div className={`design-9-neumorphic-inset design-9-toggle ${r.enabled ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); toggle(r.id, !r.enabled); }}>
               <div className="design-9-toggle-thumb flex justify-center items-center">
                  <div className={`w-2 h-2 rounded-full ${r.enabled ? 'bg-teal-400 shadow-[0_0_5px_#4fd1c5]' : 'bg-gray-400'}`} />
               </div>
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

  const [name, setName] = useState(isNew ? "" : "Focus Mode");
  const [domain, setDomain] = useState(isNew ? "" : "linkedin.com");
  const [cssText, setCssText] = useState(isNew ? "" : ".feed { display: none; }");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto py-12 px-8">
       <div className="design-9-neumorphic p-12 rounded-[40px]">
         <div className="flex justify-between items-center mb-12">
           <h2 className="text-4xl font-bold text-[#2d3748] tracking-tight">{isNew ? 'Create Theme' : 'Edit Theme'}</h2>
           <div className={`design-9-neumorphic-inset design-9-toggle ${enabled ? 'on' : ''}`} onClick={() => setEnabled(!enabled)}>
              <div className="design-9-toggle-thumb flex justify-center items-center">
                 <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-teal-400 shadow-[0_0_5px_#4fd1c5]' : 'bg-gray-400'}`} />
              </div>
           </div>
         </div>

         <div className="space-y-10">
           <div className="space-y-3">
             <label className="text-sm font-bold text-[#718096] uppercase tracking-widest pl-4">Theme Name</label>
             <input 
               type="text" 
               value={name}
               onChange={e => setName(e.target.value)}
               className="design-9-neumorphic-inset w-full bg-transparent border-none rounded-2xl px-6 py-4 text-[#2d3748] font-bold outline-none focus:ring-2 focus:ring-teal-400/50 transition-all" 
               placeholder="e.g. Dark Reader"
             />
           </div>

           <div className="space-y-3">
             <label className="text-sm font-bold text-[#718096] uppercase tracking-widest pl-4">Target Website</label>
             <input 
               type="text" 
               value={domain}
               onChange={e => setDomain(e.target.value)}
               className="design-9-neumorphic-inset w-full bg-transparent border-none rounded-2xl px-6 py-4 text-[#2d3748] font-bold outline-none focus:ring-2 focus:ring-teal-400/50 transition-all" 
               placeholder="e.g. google.com"
             />
           </div>

           <div className="space-y-3">
             <label className="text-sm font-bold text-[#718096] uppercase tracking-widest pl-4">CSS Injection</label>
             <textarea 
               value={cssText}
               onChange={e => setCssText(e.target.value)}
               className="design-9-neumorphic-inset w-full bg-transparent border-none rounded-3xl p-6 text-[#4a5568] font-mono text-sm leading-relaxed min-h-[250px] outline-none focus:ring-2 focus:ring-teal-400/50 transition-all resize-none" 
               placeholder="/* Style your web here */"
               spellCheck="false"
             />
           </div>
         </div>

         <div className="flex justify-between items-center mt-12 pt-6">
           <button onClick={() => navigate('..')} className="px-8 py-4 font-bold text-[#a0aec0] hover:text-[#e53e3e] transition-colors rounded-full hover:bg-[#e53e3e]/10">Discard</button>
           <button onClick={() => navigate('..')} className="design-9-neumorphic px-12 py-4 font-bold text-teal-600 rounded-full hover:text-teal-500 transition-colors active:shadow-[inset_6px_6px_10px_0_rgba(163,177,198,0.7),inset_-6px_-6px_10px_0_rgba(255,255,255,0.8)]">Apply Changes</button>
         </div>
       </div>
    </div>
  );
};

const ArchivedList = () => {
  const { rules } = useArchivedRules();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto pb-12">
       <div className="flex justify-between items-center mb-16 px-8">
         <div>
           <h2 className="text-4xl form-title font-bold text-[#2d3748]">Archive</h2>
           <p className="text-[#a0aec0] mt-1 font-medium">Deleted configurations</p>
         </div>
         <button onClick={() => navigate('..')} className="design-9-neumorphic design-9-card px-8 py-3 font-bold text-[#718096] rounded-2xl">Return</button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {rules.map(r => (
          <div key={r.id} className="design-9-neumorphic-inset p-8 rounded-[30px] flex flex-col justify-between">
            <div className="mb-8 opacity-70">
              <h3 className="text-2xl font-bold mb-2 text-[#2d3748]">{r.name}</h3>
              <div className="design-9-neumorphic px-4 py-1 text-sm inline-block font-medium text-[#718096] rounded-lg">
                {r.domain}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 design-9-neumorphic py-3 rounded-xl font-bold text-teal-600 active:shadow-[inset_6px_6px_10px_0_rgba(163,177,198,0.7),inset_-6px_-6px_10px_0_rgba(255,255,255,0.8)] transition-shadow">Restore</button>
              <button className="flex-1 design-9-neumorphic py-3 rounded-xl font-bold text-red-500 active:shadow-[inset_6px_6px_10px_0_rgba(163,177,198,0.7),inset_-6px_-6px_10px_0_rgba(255,255,255,0.8)] transition-shadow">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Design9() {
  return (
    <div className="design-9">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');
        .design-9 { font-family: 'Poppins', sans-serif; background-color: #e0e5ec; color: #4a5568; min-height: 100vh; padding: 3rem; }
        .design-9-neumorphic { background: #e0e5ec; box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5); border-radius: 20px; }
        .design-9-neumorphic-inset { background: #e0e5ec; box-shadow: inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8); border-radius: 20px; }
        .design-9-card { padding: 2rem; transition: 0.3s; border: none; }
        .design-9-card:hover { transform: scale(0.98); box-shadow: inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8); }
        .design-9-btn { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: #4a5568; outline: none; border: none; }
        .design-9-btn:active { box-shadow: inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8); }
        .design-9-toggle { width: 70px; height: 36px; border-radius: 50px; position: relative; cursor: pointer; }
        .design-9-toggle.on { background: #a8ece8;}
        .design-9-toggle-thumb { width: 30px; height: 30px; border-radius: 50%; background: #e0e5ec; position: absolute; top: 3px; left: 3px; transition: 0.3s; box-shadow: 2px 2px 5px rgba(163,177,198,0.8), -2px -2px 5px rgba(255,255,255,1); }
        .design-9-toggle.on .design-9-toggle-thumb { transform: translateX(34px); }
      `}</style>
      <Routes>
        <Route path="" element={<Design9RulesList />} />
        <Route path="new" element={<RuleEditor />} />
        <Route path="edit/:id" element={<RuleEditor />} />
        <Route path="archived" element={<ArchivedList />} />
      </Routes>
    </div>
  );
}

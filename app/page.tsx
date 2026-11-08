"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bookmark, Check, ChevronDown, Compass, ExternalLink, FileText, Footprints, Heart, Music2, Play, Printer, Search, Sparkles, Star, TrendingUp, X } from "lucide-react";
import { dances, type Dance } from "@/lib/dances";

type Status = "Want to learn" | "Learning" | "I know it";
type Progress = { status: Status; rating?: number; notes?: string };
type Collection = Record<string, Progress>;
const STORAGE_KEY = "line-dancer-collection-v1";
const statuses: Status[] = ["Want to learn", "Learning", "I know it"];
const ratingLabels = ["Easy breezy", "Getting comfortable", "A little tricky", "A good challenge", "Lots of practice"];

function Boot({ className = "" }: { className?: string }) {
  return <svg className={className} width="34" height="38" viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M12 4h17l-2 24 8 4c4 2 4 7-1 7H9c-4 0-5-3-4-6l5-12L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="m15 11 5 4 5-4M9 32h10m-9 7v2h8v-2m9 0h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

export default function Home() {
  const [page, setPage] = useState<"discover" | "collection">("discover");
  const [collection, setCollection] = useState<Collection>({});
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All levels");
  const [statusFilter, setStatusFilter] = useState("All dances");
  const [sort, setSort] = useState("Featured");
  const [selected, setSelected] = useState<Dance | null>(null);
  const [toast, setToast] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [glossary, setGlossary] = useState(false);
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const clean: Collection = {};
          for (const dance of dances) {
            const p = parsed[dance.id];
            if (p && statuses.includes(p.status)) clean[dance.id] = { status: p.status, rating: Number.isInteger(p.rating) && p.rating >= 1 && p.rating <= 5 ? p.rating : undefined, notes: typeof p.notes === "string" ? p.notes.slice(0, 2000) : "" };
          }
          setCollection(clean);
        }
      }
    } catch { setStorageError(true); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(collection)); } catch { setStorageError(true); } } }, [collection, ready]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 3200); return () => clearTimeout(timer); }, [toast]);

  function navigate(next: "discover" | "collection") { setPage(next); setQuery(""); setLevel("All levels"); setStatusFilter("All dances"); window.scrollTo({top: 0, behavior: "smooth"}); }
  function update(id: string, patch: Partial<Progress>) { setCollection(prev => ({ ...prev, [id]: { ...(prev[id] || { status: "Want to learn" as Status }), ...patch } })); }
  function toggleSave(dance: Dance) {
    if (collection[dance.id]) { setCollection(prev => { const next = { ...prev }; delete next[dance.id]; return next; }); setToast(`${dance.name} removed from My dances`); }
    else { update(dance.id, { status: "Want to learn" }); setToast(`${dance.name} added to My dances`); }
  }
  function exploreBeginners() { setLevel("Beginner"); setQuery(""); listRef.current?.scrollIntoView({behavior:"smooth",block:"start"}); }

  let filtered = dances.filter(d => (page === "discover" || collection[d.id]) && (level === "All levels" || d.level === level) && (page === "discover" || statusFilter === "All dances" || collection[d.id]?.status === statusFilter) && `${d.name} ${d.artist} ${d.song} ${d.choreographer}`.toLowerCase().includes(query.toLowerCase()));
  if (sort === "Name A–Z") filtered = [...filtered].sort((a,b) => a.name.localeCompare(b.name));
  if (sort === "Easiest first") filtered = [...filtered].sort((a,b) => ["Beginner","Improver","Intermediate"].indexOf(a.level) - ["Beginner","Improver","Intermediate"].indexOf(b.level));
  const savedCount = Object.keys(collection).length;
  const knownCount = Object.values(collection).filter(p => p.status === "I know it").length;

  return <div className="app-shell">
    <header className="app-header"><div className="header-inner">
      <a href="#" className="brand" onClick={e => { e.preventDefault(); navigate("discover"); }} aria-label="Line Dancer home"><span className="brand-icon"><Boot/></span><span>Line Dancer<span className="brand-dot">✦</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><button className={page === "discover" ? "active" : ""} onClick={() => navigate("discover")}><Compass size={18}/>Discover</button><button className={page === "collection" ? "active" : ""} onClick={() => navigate("collection")}><Bookmark size={18}/>My dances{savedCount > 0 && <span className="nav-count">{savedCount}</span>}</button></nav>
      <span className="header-note"><span className="live-dot"/>More dancing. More you.</span>
    </div></header>

    <main className="main-content">
      {page === "discover" ? <>
        <div className="page-heading"><div><p className="eyebrow">YOUR POCKET DANCE PARTNER</p><h1>Find your next floor favorite.</h1><p>A new dance to learn. An old favorite to remember. All in one place.</p></div><span className="heading-doodle" aria-hidden="true">✳</span></div>
        <section className="hero" aria-label="Featured dance collection">
          <img className="hero-image" src="/images/dance-hall.png" alt="Friends in western boots line dancing together in a warmly lit dance hall"/>
          <div className="hero-shade"/><div className="hero-content"><span className="hero-eyebrow"><span/>THE DANCE FLOOR IS CALLING</span><h2>Good times.<br/>Great lines.</h2><p>You bring the boots.<br/>We’ll help with the steps.</p><button className="primary-button" onClick={() => listRef.current?.scrollIntoView({behavior:"smooth",block:"start"})}>Find your next dance<ArrowRight size={17}/></button></div>
          <span className="hero-stamp"><Footprints size={21}/><span>ONE STEP<br/>AT A TIME</span></span>
        </section>
        <div className="quick-links"><button onClick={exploreBeginners}><span className="quick-icon"><Footprints size={21}/></span><span><strong>Two left feet? Start here.</strong><small>Easy dances. Big dance-floor energy.</small></span><ArrowRight size={19}/></button><button onClick={() => navigate("collection")}><span className="quick-icon olive"><Bookmark size={21}/></span><span><strong>Your dances, in your back pocket.</strong><small>Save it. Learn it. Make it yours.</small></span><ArrowRight size={19}/></button></div>
      </> : <div className="collection-heading"><p className="eyebrow">YOUR PERSONAL SETLIST</p><h1>My dances<span className="small-sparkle">✦</span></h1><p>A little practice today. A little more confidence on the floor.</p><div className="collection-stats"><span><strong>{savedCount}</strong> saved {savedCount === 1 ? "dance" : "dances"}</span><span className="stat-divider"/><span><strong>{knownCount}</strong> ready for the dance floor <Check size={15}/></span></div></div>}

      <section className="dance-section" ref={listRef}>
        <div className="section-heading"><div><p className="eyebrow">{page === "discover" ? "FIND YOUR GROOVE" : "A FEW GOOD MOVES"}</p><h2>{page === "discover" ? <>Dance-floor favorites <TrendingUp size={23}/></> : "Your collection"}</h2><p>{page === "discover" ? "A handpicked mix of crowd-pleasers and country classics." : "From “I want to learn” to “I’ve got this.”"}</p></div><label className="sort-control"><span className="sr-only">Sort dances</span><select value={sort} onChange={e => setSort(e.target.value)}><option>Featured</option><option>Name A–Z</option><option>Easiest first</option></select><ChevronDown size={14}/></label></div>
        <div className="filter-bar"><label className="search-field"><Search size={19}/><input placeholder="Search dances, songs, artists…" aria-label="Search dances, songs, artists" value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button aria-label="Clear search" onClick={()=>setQuery("")}><X size={16}/></button>}</label><div className="level-filters" aria-label="Filter by difficulty">{["All levels","Beginner","Improver","Intermediate"].map(l=><button aria-pressed={level===l} key={l} className={level===l?"selected":""} onClick={()=>setLevel(l)}>{l}</button>)}</div></div>
        {page === "collection" && savedCount > 0 && <div className="status-filters">{["All dances",...statuses].map(s=><button className={statusFilter===s?"selected":""} key={s} onClick={()=>setStatusFilter(s)}>{s}<span>{s==="All dances"?savedCount:Object.values(collection).filter(p=>p.status===s).length}</span></button>)}</div>}
        {filtered.length > 0 ? <div className="dance-grid">{filtered.map((dance, index) => <DanceCard key={dance.id} dance={dance} index={dances.indexOf(dance)} progress={collection[dance.id]} onOpen={()=>setSelected(dance)} onSave={()=>toggleSave(dance)}/>)}</div> : <div className="empty-state"><span className="empty-icon">{savedCount===0 && page==="collection" ? <Boot/> : <Search size={30}/>}</span><h3>{savedCount===0 && page==="collection" ? "Every great night starts with one dance." : "No dances match just yet."}</h3><p>{savedCount===0 && page==="collection" ? "Tap the bookmark on a dance to keep it here. Your next favorite is waiting." : "Try another name or give a different difficulty a spin."}</p><button className="primary-button" onClick={()=>{if(savedCount===0&&page==="collection") navigate("discover");else{setQuery("");setLevel("All levels");setStatusFilter("All dances");}}}>{savedCount===0&&page==="collection"?"Discover dances":"Clear filters"}<ArrowRight size={16}/></button></div>}
        {filtered.length > 0 && <div className="results-note"><span>{filtered.length} {filtered.length===1?"dance":"dances"} to make your own</span><span>Keep learning. Keep moving. <Heart size={13}/></span></div>}
      </section>
      <section className="tip-banner"><span className="tip-star" aria-hidden="true">✧</span><div><p className="eyebrow">A LITTLE DANCE-FLOOR WISDOM</p><h3>Nobody starts with all the right steps.</h3><p>Learn one wall at a time. The rest comes with the music.</p></div><button onClick={()=>setGlossary(true)}>Learn the lingo<ArrowRight size={17}/></button></section>
      <footer><span className="footer-brand"><Boot/>Line Dancer</span><p>Made for the love of the dance.</p><span>{page==="collection" ? (storageError ? "Device storage unavailable. Changes last this session." : "Your dances are saved on this device.") : "Choreography & lessons belong to their creators."}</span></footer>
    </main>
    <nav className="mobile-nav" aria-label="Mobile navigation"><button className={page==="discover"?"active":""} onClick={()=>navigate("discover")}><Compass size={22}/><span>Discover</span></button><button className={page==="collection"?"active":""} onClick={()=>navigate("collection")}><span className="mobile-bookmark"><Bookmark size={22}/>{savedCount>0&&<i>{savedCount}</i>}</span><span>My dances</span></button></nav>
    {selected && <DanceDetail dance={selected} progress={collection[selected.id]} onClose={()=>setSelected(null)} onUpdate={patch=>update(selected.id,patch)} onSave={()=>toggleSave(selected)}/>}
    {glossary && <Glossary onClose={()=>setGlossary(false)}/>}
    {toast && <div className="toast" role="status"><Check size={17}/>{toast}</div>}
  </div>;
}

function DanceCard({dance,index,progress,onOpen,onSave}:{dance:Dance;index:number;progress?:Progress;onOpen:()=>void;onSave:()=>void}) {
  const images=["/images/boots.jpg","/images/hall.jpg","/images/dance-hall.png"];
  return <article className="dance-card"><div className={`card-art art-${index%3}`}><button className="card-image-button" onClick={onOpen} aria-label={`Open ${dance.name}`}><img src={images[index%3]} alt="" loading="lazy"/><span className="card-image-shade"/><span className="art-title">{dance.name}</span></button><span className={`level-badge level-${dance.level.toLowerCase()}`}><i/>{dance.level}</span><button className={`save-button ${progress?"saved":""}`} onClick={onSave} aria-label={`${progress?"Remove":"Save"} ${dance.name}`} aria-pressed={!!progress}><Bookmark size={18} fill={progress?"currentColor":"none"}/></button><span className="card-counts">{dance.counts} counts<span>·</span>{dance.walls} walls</span></div><div className="card-body"><div className="card-title-row"><button className="card-title" onClick={onOpen}>{dance.name}</button>{progress?.status==="I know it"&&<span className="known-check" title="I know it"><Check size={15}/></span>}</div><p className="song-name"><Music2 size={13}/><span>{dance.song} · {dance.artist}</span></p><p className="card-description">{dance.description}</p><div className="card-bottom"><span className={progress?"progress-label":"choreographer"}>{progress?<><span className={`status-dot ${progress.status==="I know it"?"known":""}`}/>{progress.status}</>:dance.choreographer}</span><button onClick={onOpen} className="learn-link">{progress?"Keep dancing":"Learn dance"}<ArrowRight size={15}/></button></div></div></article>;
}

function useDialog(onClose:()=>void) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement; const overflow=document.body.style.overflow; document.body.style.overflow="hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    function keydown(e:KeyboardEvent){ if(e.key==="Escape")onClose(); if(e.key==="Tab") { const nodes=ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]'); if(!nodes?.length)return; const first=nodes[0],last=nodes[nodes.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}} }
    document.addEventListener("keydown",keydown);return()=>{document.body.style.overflow=overflow;document.removeEventListener("keydown",keydown);previous?.focus();};
  },[]);return ref;
}
function DanceDetail({dance,progress,onClose,onUpdate,onSave}:{dance:Dance;progress?:Progress;onClose:()=>void;onUpdate:(p:Partial<Progress>)=>void;onSave:()=>void}) {
  const [tab,setTab]=useState("Tutorial");const [playing,setPlaying]=useState(false);const ref=useDialog(onClose);
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><div className="dance-dialog" role="dialog" aria-modal="true" aria-labelledby="dance-title" ref={ref}>
    <div className="dialog-top"><span><Boot/>LET’S LEARN A NEW ONE</span><button onClick={onClose} aria-label="Close dance details" className="icon-button"><X size={22}/></button></div>
    <div className="detail-heading"><span className={`level-badge level-${dance.level.toLowerCase()}`}><i/>{dance.level}</span><h2 id="dance-title">{dance.name}</h2><p>Choreographed by {dance.choreographer}</p><div className="detail-meta"><span><Music2 size={15}/>{dance.song} · {dance.artist}</span><span>{dance.counts} counts</span><span>{dance.walls} walls</span></div></div>
    <div className="detail-tabs" role="tablist" aria-label="Dance details">{["Tutorial","Steps & sheets","My progress"].map(t=><button key={t} role="tab" aria-selected={tab===t} id={`tab-${t}`} aria-controls="detail-panel" onClick={()=>setTab(t)} className={tab===t?"selected":""}>{t==="Tutorial"?<Play size={16}/>:t==="Steps & sheets"?<FileText size={16}/>:<Footprints size={16}/>}<span>{t}</span></button>)}</div>
    <div className="detail-panel" id="detail-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
      {tab==="Tutorial"&&<><div className="video-container">{playing?<iframe src={`https://www.youtube-nocookie.com/embed/${dance.videoId}?autoplay=1`} title={`${dance.name} lesson`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>:<button className="video-cover" onClick={()=>setPlaying(true)}><img src="/images/dance-hall.png" alt=""/><span className="video-overlay"/><span className="play-circle"><Play size={27} fill="currentColor"/></span><span>Let’s break it down<small>Play the {dance.name} lesson</small></span></button>}</div><div className="lesson-caption"><div><strong>{dance.videoLabel}</strong><p>Follow along at your own pace. Rewind whenever you need.</p></div><a href={`https://www.youtube.com/watch?v=${dance.videoId}`} target="_blank" rel="noopener noreferrer" aria-label="Open lesson on YouTube"><ExternalLink size={18}/></a></div><div className="mini-tip"><Sparkles size={20}/><p><strong>A little tip</strong>Try the steps without music first. Add the song when your feet feel ready.</p></div><a className="text-link" href={`https://www.youtube.com/watch?v=${dance.videoId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube<ExternalLink size={14}/></a></>}
      {tab==="Steps & sheets"&&<><div className="sheet-intro"><span className="sheet-icon"><FileText size={29}/></span><div><h3>The steps, without the screen time.</h3><p>Keep the choreographer’s full directions handy for your next practice.</p></div></div><div className="sheet-card"><div><p className="eyebrow">OFFICIAL CHOREOGRAPHY REFERENCE</p><h3>{dance.name}</h3><p>{dance.choreographer} · {dance.counts} counts · {dance.walls} walls</p></div><FileText size={35} strokeWidth={1.2}/></div><div className="sheet-actions"><a className="primary-button" href={dance.pdfUrl} target="_blank" rel="noopener noreferrer"><FileText size={17}/>View PDF<ExternalLink size={14}/></a><a className="secondary-button" href={`${dance.pdfUrl}#toolbar=1`} target="_blank" rel="noopener noreferrer"><Printer size={17}/>Print directions</a></div><p className="sheet-help">The PDF opens in a new tab. Use its print button, or choose Print in your browser to print or save a copy.</p><div className="dance-reminder"><h3>A quick practice reminder</h3><div className="step-tags">{dance.tags.map(tag=><span key={tag}>{tag}</span>)}</div><p>{dance.notes}</p></div><a className="source-link" href={dance.sheetUrl} target="_blank" rel="noopener noreferrer">View the full step sheet on CopperKnob<ExternalLink size={14}/></a><div className="mini-tip"><Heart size={20}/><p><strong>A little credit goes a long way.</strong>Step sheets and lessons are shared by their original creators. Choreography versions can differ—these links match {dance.choreographer}’s dance.</p></div></>}
      {tab==="My progress"&&<><div className="progress-section"><p className="eyebrow">MAKE IT YOURS</p><h3>Where are you with this one?</h3><div className="progress-options">{statuses.map((s,i)=><button key={s} aria-pressed={progress?.status===s} className={progress?.status===s?"selected":""} onClick={()=>onUpdate({status:s})}>{i===0?<Bookmark size={18}/>:i===1?<Footprints size={18}/>:<Check size={18}/>}<span>{s}</span>{progress?.status===s&&<Check className="status-check" size={15}/>}</button>)}</div></div><div className="rating-section"><h3>How tricky is it for you?</h3><p>Your own difficulty rating. One is easy, five is a challenge.</p><div className="rating-buttons">{[1,2,3,4,5].map(n=><button key={n} className={(progress?.rating||0)>=n?"filled":""} aria-label={`Rate difficulty ${n} out of 5: ${ratingLabels[n-1]}`} aria-pressed={progress?.rating===n} onClick={()=>onUpdate({rating:n})}><Star size={25} fill={(progress?.rating||0)>=n?"currentColor":"none"}/><span>{n}</span></button>)}</div><span className="rating-label">{progress?.rating?ratingLabels[progress.rating-1]:"Give it a go, then rate it."}</span></div><label className="notes-field"><strong>A reminder for next time</strong><span>That tricky turn? A favorite teacher? Leave yourself a note.</span><textarea maxLength={2000} placeholder="e.g. Remember the restart after the second wall…" value={progress?.notes||""} onChange={e=>onUpdate({notes:e.target.value})}/></label><p className="autosave-note"><Check size={13}/>Your progress saves automatically on this device.</p></>}
    </div>
    <div className="dialog-bottom"><span>{progress?<><Check size={16}/>In your collection</>:"Good moves are worth keeping."}</span><button className={progress?"secondary-button":"primary-button"} onClick={onSave}><Bookmark size={17} fill={progress?"currentColor":"none"}/>{progress?"Remove from my dances":"Add to my dances"}</button></div>
  </div></div>;
}

function Glossary({onClose}:{onClose:()=>void}){const ref=useDialog(onClose);return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><div className="glossary-dialog" role="dialog" aria-modal="true" aria-labelledby="glossary-title" ref={ref}><div className="dialog-top"><span><Footprints size={19}/>THE BASICS</span><button className="icon-button" onClick={onClose} aria-label="Close step glossary"><X size={22}/></button></div><div className="glossary-body"><p className="eyebrow">SPEAK A LITTLE DANCE</p><h2 id="glossary-title">Know your next step.</h2><p>A few words you’ll hear in a lesson.</p>{[["Wall","The direction you face when the dance pattern starts again. A four-wall dance eventually faces all four sides of the room."],["Grapevine","Step to the side, cross the other foot behind, step to the side again, then finish as the dance directs."],["Sailor step","A three-step move: cross one foot behind the other, step the other foot to the side, then step the first foot slightly out."],["Kick ball change","Kick one foot forward, place the ball of that foot down, then shift weight to the other foot."],["Restart","Begin the dance again before finishing the full pattern, at the point indicated by the choreographer."],["Tag","An extra little sequence added at a specific point in the song. Check the step sheet for when and how."]].map(([term,definition])=><div className="glossary-entry" key={term}><h3>{term}</h3><p>{definition}</p></div>)}</div><div className="dialog-bottom"><span>It all starts with one step.</span><button className="primary-button" onClick={onClose}>Got it<Check size={16}/></button></div></div></div>}

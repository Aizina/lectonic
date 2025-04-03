"use strict";exports.id=474,exports.ids=[474],exports.modules={7084:(e,t,s)=>{s.d(t,{A:()=>x});var a=s(8732),r=s(7439),l=s(958),n=s(8240),i=s(9965),o=s.n(i),c=s(1106),d=s.n(c);let x=({lecturers:e,hasMore:t,loadMore:s,loading:i})=>(0,a.jsx)(l.W,{title:"Лекторы",children:(0,a.jsxs)("div",{children:[e.map(e=>(0,a.jsxs)("div",{className:"flex flex-col max-w-[1094px] gap-8 border-b border-[#B3B3B3] mb-10",children:[(0,a.jsxs)("div",{className:"flex flex-row gap-6 justify-between items-start",children:[(0,a.jsxs)("div",{className:"flex gap-6",children:[(0,a.jsx)("div",{className:"relative w-[163px] h-[156px]",children:(0,a.jsx)(o(),{src:e.image,alt:"Изображение лекции",sizes:"(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw",fill:!0,className:"object-cover rounded-[26px] border"})}),(0,a.jsxs)("div",{className:"max-w-[745px] flex flex-col gap-3",children:[(0,a.jsx)("span",{className:`font-roboto text-[24px] leading-[136%] uppercase ${e.name.length<50?"mb-[74px]":""}`,children:e.name}),e.themes.length>=1&&(0,a.jsx)("div",{className:"flex gap-5",children:e.themes.map((e,t)=>(0,a.jsx)("div",{className:"py-1 px-5 bg-[#F7F7F7] text-primaryText rounded-[50px] text-[10px] 2xl:text-[16px] leading-7 font-medium",children:e.title},e.id??t))})]})]}),e.emergencySpeaking&&(0,a.jsx)("div",{className:"items-end bg-[#FFBA1A] rounded-[20px] py-[8px] px-[12px] font-montserrat text-[#363636] text-[14px]",children:"Спикер на завтра"})]}),(0,a.jsx)("div",{children:(0,a.jsx)("span",{className:"font-montserrat text-[16px] leading-[136%] text-[#6B6B6B]",children:(0,n.Z)(e.about,200)})}),(0,a.jsxs)("div",{className:"flex pt-5 pb-10 justify-between",children:[(0,a.jsx)("div",{className:"flex font-montserrat text-[16px] items-center",children:e.formats.length>1||"any"===e.formats[0]?(0,a.jsx)("p",{children:"Проводит лекции online и offline"}):(0,a.jsxs)("p",{children:["Проводит лекции ",e.formats[0]]})}),(0,a.jsx)(d(),{href:`/lecturer/${e.id}`,children:(0,a.jsx)("div",{children:(0,a.jsx)("div",{className:"flex justify-between items-center py-2 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer",children:(0,a.jsx)("span",{className:"font-roboto text-white text-[20px]",children:"Подробнее"})})})})]})]},e.id)),i&&e.length>0&&(0,a.jsx)("div",{className:"font-montserrat text-[14px] text-[#454545] leading-[130%] text-center my-4",children:"Загрузка..."}),t&&!i&&(0,a.jsxs)("div",{onClick:s,className:"flex justify-center my-8 hover:cursor-pointer items-center gap-5",children:[(0,a.jsx)("span",{className:"font-montserrat font-medium text-[14px] text-[#454545] leading-[130%]",children:"Показать больше"}),(0,a.jsx)(o(),{src:r.A,alt:"Вниз"})]})]})})},3547:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.d(t,{H:()=>i});var r=s(1428),l=s(2015),n=e([r]);r=(n.then?(await n)():n)[0];let o=e=>{let t=new URLSearchParams;for(let s in e){let a=e[s];Array.isArray(a)?a.forEach(e=>t.append(s,String(e))):null!=a&&""!==a&&t.append(s,String(a))}return t.toString()};function i({organizationId:e,selectedThemes:t,searchValue:s}){let[a,n]=(0,l.useState)([]),[i,c]=(0,l.useState)(4),[d,x]=(0,l.useState)(!0),[m,p]=(0,l.useState)(null),[h,u]=(0,l.useState)(!0),f=(0,l.useCallback)(async(s,a=!1)=>{console.log(`WorkspaceLecturers called: numToFetch=${s}, isRefetch=${a}, themes=[${t.join(",")}]`),x(!0),p(null),a&&n([]);let l=e?`/organization/${e}/lecturers`:"/lecturers",i=`https://api.lectonic.skroy.ru${l}`,c={current_page:1,objects_per_page:s};t.length>0&&(c.themes=t),console.log("Fetching lecturers with params:",c);try{let e=await r.default.get(i,{headers:{"project-id":"7bad8c49-6e57-4347-9e14-ebc056c21136"},params:c,paramsSerializer:o});if(!e.data||!Array.isArray(e.data.data)){console.warn("Invalid response structure or missing data array:",e.data),a&&n([]),u(!1),p("Неверный формат ответа от сервера.");return}let t=e.data.data||[],l=t.map(e=>({id:e.lecturer_id,name:[e.profile.first_name,e.profile.middle_name,e.profile.last_name].filter(Boolean).join(" ").replace(/\s+/g," ").trim(),about:e.lecturer.about,image:e.profile.photo_main,specialization:e.lecturer.specialization,themes:Array.isArray(e.themes)?e.themes.map(e=>({id:e.id??`fallback-id-${Math.random()}`,title:e.title??"Без названия"})):[],formats:Array.isArray(e.lecturer.format)?e.lecturer.format:[],emergencySpeaking:e.lecturer.emergency_speaking}));console.log(`Workspaceed ${t.length} items, transformed ${l.length}`),n(l);let d=t.length;u(d===s),console.log(`HasMore set to: ${d===s} (fetched: ${d}, requested: ${s})`)}catch(s){console.error("Error fetching lecturers:",s);let e="Неизвестная ошибка загрузки лекторов";r.default.isAxiosError(s)?(e=s.response?.data?.message||s.message||e,s.response?.status===404?e=t.length>0?"Лекторы с выбранными темами не найдены.":"Лекторы не найдены.":s.response?.status===500&&(e="Ошибка на сервере при загрузке лекторов.")):s instanceof Error&&(e=s.message),p(e),n([]),u(!1)}finally{x(!1)}},[e,t]),g=(0,l.useCallback)(()=>{if(!d&&h){let e=i+4;console.log(`Load more requested. Fetching up to ${e} items.`),c(e),f(e,!1)}else console.log(`Load more skipped: loading=${d}, hasMore=${h}`)},[d,h,i,f]),j=(0,l.useCallback)(()=>{console.log("Explicit refetch requested."),c(4),f(4,!0)},[f]);return{lecturers:a,loading:d,error:m,hasMore:h,loadMore:g,refetch:j}}a()}catch(e){a(e)}})},474:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>x});var r=s(8732),l=s(7084),n=s(3547),i=s(2015),o=s(2498),c=s(2285),d=e([n,c]);[n,c]=d.then?(await d)():d;let x=({organizationId:e})=>{let[t,s]=(0,i.useState)(""),[a,d]=(0,i.useState)([]),[x,m]=(0,i.useState)(!1),[p,h]=(0,i.useState)(""),{lecturers:u,loading:f,error:g,hasMore:j,loadMore:y,refetch:b}=(0,n.H)({organizationId:e,selectedThemes:a,searchValue:t}),v=(0,i.useCallback)(()=>{m(!0)},[]),N=(0,i.useCallback)(()=>{m(!1)},[]),w=(0,i.useCallback)(()=>{b(),N()},[N]),S=(0,i.useCallback)(()=>{d([]),b(),N()},[]);return((0,i.useEffect)(()=>{if(f){h("Загрузка данных...");return}u.length>0||j?h(""):setTimeout(()=>{h(a.length>0?"Лекции, соответствующие вашим фильтрам, не найдены.":"Данных о лекциях пока нет.")},300)},[f,u,a,j]),g)?(0,r.jsxs)("div",{className:"container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px] text-center",children:["Произошла ошибка: ",g]}):(0,r.jsx)("div",{className:"container mx-auto my-8 px-4 relative",children:(0,r.jsxs)("div",{className:"container mx-auto flex py-24 justify-between gap-10",children:[(0,r.jsx)("div",{className:"text-left basis-3/10",children:(0,r.jsxs)("div",{className:"max-w-[356px] flex flex-col gap-5",children:[(0,r.jsx)("span",{className:"font-roboto font-medium text-[48px] leading-[125%]",children:"Каталог лекторов"}),(0,r.jsx)("span",{className:"font-montserrat font-normal text-[20px] text-[#6B6B6B] leading-[136%]",children:"Выберите интересующего вас  эксперта."})]})}),(0,r.jsxs)("div",{className:"flex flex-col gap-10 basis-7/10 w-[100%]",children:[(0,r.jsx)(o.A,{searchValue:t,setSearchValue:s,onOpenThemesModal:v,isLectorsPage:!0}),(0,r.jsx)(c.A,{isOpen:x,onClose:N,selectedThemes:a,setSelectedThemes:d,onApplyFilters:w,onResetFilters:S}),(0,r.jsx)("div",{className:"min-h-[700px] flex justify-center items-center ",children:f?(0,r.jsx)("span",{className:"text-[48px] font-roboto uppercase font-bold",children:"Загрузка данных..."}):0===u.length?(0,r.jsx)("span",{className:"text-xl text-gray-500",children:p}):(0,r.jsx)(l.A,{lecturers:u,hasMore:j,loadMore:y,loading:f})})]})]})})};a()}catch(e){a(e)}})}};
import { FiSearch, FiBell } from "react-icons/fi";

export default function DashBoardHeader({
title,
subtitle,
}) {

return (

<div className="bg-white  px-6 py-2.5 flex justify-between items-center">

{/* LEFT */}
<div>

<h1 className="text-xl px-4 font-semibold text-gray-800">
{title}
</h1>

<p className="text-gray-500 px-4 text-xs">
{subtitle}
</p>

</div>


{/* RIGHT */}
<div className="flex items-center gap-3">


{/* SEARCH */}
<div className="flex items-center bg-gray-100 border px-3 py-1 rounded-lg">

<FiSearch className="text-gray-400"/>

<input
type="text"
placeholder="Search tasks..."
className="outline-none ml-2 text-sm bg-transparent w-40"
/>

</div>


{/* NOTIFICATION */}
<div className="relative cursor-pointer">

<FiBell size={18}/>

<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">

2

</span>

</div>


</div>

</div>

);

}
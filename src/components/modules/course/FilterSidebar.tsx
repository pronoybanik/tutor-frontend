// "use client";

// import { Slider } from "@/components/ui/slider";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { getAllCategory } from "@/services/Category";
// import { toast } from "sonner";
// import { getProfileInfo } from "@/services/Profile";

// const FilterSidebar = () => {

//     const [isLoading, setIsLoading] = useState(false);

//   const [categories, setCategories] = useState([]);
//   const [profile, setProfile] = useState([]);

//   console.log(categories, profile);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [{ data: categoriesData }, { data: profileData }] =
//           await Promise.all([getAllCategory(), getProfileInfo()]);
//           console.log("t", categoriesData,profileData);
          
//         // setCategories(categoriesData);
//         // setProfile(profileData);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch filters");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);


//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Filter
//         </h2>
//         <Button size="sm" className="bg-black hover:bg-gray-700 ml-5">
//           Clear Filters
//         </Button>
//       </div>

//       {/* Price Filter */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//           Price
//         </h2>
//         <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
//           <span>$0</span>
//           <span>$500000</span>
//         </div>
//         <Slider max={500000} step={1} className="w-full" />
//         <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
//           Selected Price: $0
//         </p>
//       </div>

//       {/* Product Category */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//           Product Category
//         </h2>
//         <RadioGroup className="space-y-2">
//           {categories?.map((category) => (
//             <div key={category} className="flex items-center space-x-2">
//               <RadioGroupItem value={category} id={category} />
//               <Label
//                 htmlFor={category}
//                 className="text-gray-600 dark:text-gray-400 font-light"
//               >
//                 {category}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>

//       {/* Brands */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//           Brands
//         </h2>
//         <RadioGroup className="space-y-2">
//           {profile?.map((brand) => (
//             <div key={brand} className="flex items-center space-x-2">
//               <RadioGroupItem value={brand} id={brand} />
//               <Label
//                 htmlFor={brand}
//                 className="text-gray-600 dark:text-gray-400 font-light"
//               >
//                 {brand}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>

//       {/* Rating */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//           Rating
//         </h2>
//         <RadioGroup className="space-y-3">
//           {[5, 4, 3, 2, 1].map((rating) => (
//             <div key={rating} className="flex items-center space-x-2">
//               <RadioGroupItem value={`${rating}`} id={`rating-${rating}`} />
//               <Label htmlFor={`rating-${rating}`} className="flex items-center">
//                 {Array.from({ length: 5 }, (_, i) => (
//                   <Star
//                     size={18}
//                     key={i}
//                     fill={i < rating ? "orange" : "lightgray"}
//                     stroke={i < rating ? "orange" : "lightgray"}
//                   />
//                 ))}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;

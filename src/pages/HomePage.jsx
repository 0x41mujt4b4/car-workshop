import React from "react";
// import AddProduct from "../components/AddProduct";
import ButtonCard from "../components/ButtonCard";
import maintenance from "../assets/images/maintenance.png";
import showCars from "../assets/images/car-repair.png";
import spareParts from "../assets/images/spare-parts.png";
import addPart from "../assets/images/repair.png"
import Header from "../components/Header";
import manageUsers from "../assets/images/team-management.png"

const cards = [
  {
    title: "إضافة اسبير",
    src: addPart,
    url: "/add_item",
  }, 
  {
    
    title: "إضافة سيارة",
    src: maintenance,
    url: "/add_car",
  },
  {
    title: "الأسبيرات",
    src: spareParts,
    url: "/pos",
  },
  {
    title: "عرض السيارات",
    src: showCars,
    url: "/cars",
  },
  {
    title: "إدارة الموظفين",
    src: manageUsers,
    url: "#",
  },
];

const HomePage = () => {
  return (
    <>
      <Header
        customClass="h-20"
        heading="دنبلاب لصيانة السيارات"
        // paragraph="الصفحة الرئيسية"
        // linkName="Signup"
        // linkUrl="/signup"
      />
      <div className="flex items-center justify-center">
        <div className="grid sm:grid-cols-4 xs:grid-cols-1 gap-2 p-6">
          {cards.map((card, key) => (
            <ButtonCard title={card.title} src={card.src} url={card.url} key={key}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

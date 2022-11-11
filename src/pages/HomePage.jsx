import React from "react";
// import AddProduct from "../components/AddProduct";
import ButtonCard from "../components/ButtonCard";
import maintenance from "../assets/images/maintenance.png";
import showCars from "../assets/images/car-repair.png";
import spareParts from "../assets/images/spare-parts.png";
import addPart from "../assets/images/repair.png"
import Header from "../components/Header";

const cards = [
  {
    title: "إضافة اسبير",
    src: addPart,
    url: "#",
  }, 
  {
    title: "إضافة سيارة",
    src: maintenance,
    url: "#",
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
];

const HomePage = () => {
  return (
    <>
      <Header
        heading="دنبلاب لصيانة السيارات"
        paragraph="الصفحة الرئيسية"
        // linkName="Signup"
        linkUrl="/signup"
      />
      <div class="flex items-center justify-center">
        <div class="grid sm:grid-cols-4 xs:grid-cols-1 gap-2 p-6">
          {cards.map((card) => (
            <ButtonCard title={card.title} src={card.src} url={card.url} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

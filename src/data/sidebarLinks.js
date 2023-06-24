import { AiOutlineSchedule, AiOutlineBook } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FaUsers, FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";

const teacherLinks = [
  {
    href: "/",
    text: "Список занятий",
    icon: <AiOutlineSchedule />,
    role: "Teacher",
  },
  {
    href: "/materials",
    text: "Учебные материалы",
    icon: <MdLibraryBooks />,
    role: "Teacher",
  },
];

const adminLinks = [
  {
    href: "/",
    text: "Студенты",
    icon: <AiOutlineSchedule />,
    role: "Admin",
  },
  {
    href: "/teachers",
    text: "Преподаватели",
    icon: <GiTeacher />,
    role: "Admin",
  },
  {
    href: "/groups",
    text: "Группы",
    icon: <FaUsers />,
    role: "Admin",
  },
  {
    href: "/payment",
    text: "Оплата",
    icon: <FaCreditCard />,
    role: "Admin",
  },
];

const studentLinks = [
  {
    href: "/",
    text: "Мои курсы",
    icon: <AiOutlineBook />,
    role: "Student",
  },
];

const accountantLinks = [
  {
    href: "/",
    text: "Оплата",
    icon: <FaCreditCard />,
    role: "Accountant",
  },
  {
    href: "/salary",
    text: "Зарплаты",
    icon: <FaMoneyBillAlt />,
    role: "Accountant",
  },
];

export const links = [
  ...teacherLinks,
  ...adminLinks,
  ...studentLinks,
  ...accountantLinks,
];

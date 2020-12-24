import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Host from "@/pages/Host.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import login from "@/pages/login.vue";
import loginv2 from "@/pages/home.vue";
import register from "@/pages/register.vue";
import home2 from "@/pages/home2.vue";
import test from "@/pages/test.vue";
import myCars from "@/pages/MyCars.vue";
import template from "@/pages/Template.vue";
import addCar from "@/pages/AddCar.vue";
import myReservation from "@/pages/MyReservation.vue";
import rentalRequest from "@/pages/RentalRequest.vue";
import thankYou from "@/pages/ThankYou.vue";
import chat from "@/pages/Chat.vue";
import hostChat from "@/pages/HostChat.vue";
import guestChat from "@/pages/GuestChat.vue";

import AdminDashboardLayout from "@/pages/Layout/AdminDashboardLayout.vue";
import adminApproval from "@/pages/AdminApproval.vue";
import allUsers from "@/pages/AllUsers.vue";
import allCar from "@/pages/AllCar.vue";

const routes = [
  {
    path: "/",
    name: "Home Page",
    component: loginv2,
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home Page",
    component: loginv2
  },
  {
    path: "/home2",
    name: "Home Page 2",
    component: home2
  },
  {
    path: "/myreservation",
    name: "My Reservation",
    component: myReservation
  },
  {
    path: "/thankyou",
    name: "Thank You",
    component: thankYou
  },
  {
    path: "/chat",
    name: "Chat Page",
    component: chat
  },
  {
    path: "/guestchat/:rentid",
    name: "Guest Chat Page",
    component: guestChat
  },
  {
    path: "/login",
    name: "Login Page",
    component: login
  },
  {
    path: "/test",
    name: "Testing Page",
    component: test
  },
  {
    path: "/register",
    name: "Register Page",
    component: register
  },
  {
    path: "/host",
    component: DashboardLayout,
    redirect: "/rentalrequest",
    children: [
      {
        path: "/host",
        name: "Dashboard",
        // component: Host
        component: rentalRequest
      },
      {
        path: "/hostchat/:rentid",
        name: "Host Chat Page",
        component: hostChat
      },
      {
        path: "/myCars",
        name: "My Cars",
        component: myCars
      },
      {
        path: "/rentalrequest",
        name: "Rental Request",
        component: rentalRequest
      },
      {
        path: "/mycars/addcar",
        name: "Add New Cars",
        component: addCar
      },
      {
        path: "/template",
        name: "Template",
        component: template
      },
      {
        path: "/user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      }
    ]
  },
  {
    path: "/admin",
    component: AdminDashboardLayout,
    redirect: "/adminapproval",
    children: [
      {
        path: "/adminapproval",
        name: "Admin Approval",
        component: adminApproval
      },
      {
        path: "/allusers",
        name: "All Users",
        component: allUsers
      },
      {
        path: "/allcar",
        name: "All Cars",
        component: allCar
      }
    ]
  }
];

export default routes;

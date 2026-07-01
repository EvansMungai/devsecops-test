import { Icons } from "./icon-registry"
import { Link } from "./links"

export const HomeLinks: Link[] = [
    {
        title: "Contact",
        url: "#footer",
        icon: Icons.bars
    },
    {
        title: "Sign Up",
        url: "/signup",
        icon: Icons.bars
    },
    {
        title: "Log In",
        url: "/login",
        icon: Icons.bars
    }
]
export const StudentLinks: Link[] = [
    {
        title: "Dashboard",
        url: "/uhb/student",
        icon: Icons.house
    },
    {
        title: "Book a Room",
        url: "/uhb/student/booking",
        icon: Icons.penToSquare
    },
    {
        title: "Application Details",
        url: "/uhb/student/application-details",
        icon: Icons.filePen
    },
    {
        title: "Accommodation Details",
        url: "/uhb/student/accommodation-details",
        icon: Icons.houseUser
    },
    {
        title: "User Details",
        url: "/uhb/student/user-details",
        icon: Icons.userGear
    }
]
export const HousekeeperLinks: Link[] = [
    {
        title: "Review Applications",
        url: "/uhb/housekeeper",
        icon: Icons.filePen
    },
    {
        title: "Successful Applications",
        url: "/uhb/housekeeper/successful-applications",
        icon: Icons.book
    },
    {
        title: "User Details",
        url: "/uhb/housekeeper/user-details",
        icon: Icons.userGear
    }
]
export const MatronLinks: Link[] = [
    {
        title: "Review Allocations",
        url: "/uhb/matron",
        icon: Icons.filePen
    },
    {
        title: "Allocated Rooms",
        url: "/uhb/matron/allocated-rooms",
        icon: Icons.tents
    },
    {
        title: "User Details",
        url: "/uhb/matron/user-details",
        icon: Icons.userGear
    }
]
export const AdminLinks: Link[] = [
    {
        title: "Dashboard",
        url: "/uhb/admin",
        icon: Icons.house
    },
    {
        title: "Hostel Management",
        url: "/uhb/admin/register",
        icon: Icons.tents
    },
    {
        title: "User Management",
        url: "/uhb/admin/change-user-roles",
        icon: Icons.usersGear
    },
    {
        title: "User Details",
        url: "/uhb/admin/user-details",
        icon: Icons.userGear
    }
]

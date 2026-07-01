import { Routes } from '@angular/router';
import { LandingComponent } from './shared/pages/landing/landing.component';
import { DashboardComponent } from './features/student/student.component';
import { ReviewApplicationsComponent } from './features/housekeeper/review-applications/review-applications.component';
import { ReviewAllocationsComponent } from './features/matron/review-allocations/review-allocations.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { BookingComponent } from './features/student/booking/booking.component';
import { NotfoundComponent } from './shared/pages/notfound/notfound.component';
import { DrawerComponent } from './shared/elements/drawer/drawer.component';
import { StudentDashboardComponent } from './features/student/dashboard/dashboard.component';
import { ApplicationDetailsComponent } from './features/student/application-details/application-details.component';
import { AccommodationDetailsComponent } from './features/student/accommodation-details/accommodation-detials.component';
import { RegisterStudentDetailsComponent } from './features/student/register-student-details/register-student-details.component';
import { ViewAllocationComponent } from './features/matron/view-allocation/view-allocation.component';
import { ViewApplicationComponent } from './features/housekeeper/view-application/view-application.component';
import { UserDetailsComponent } from './shared/pages/user-details/user-details.component';
import { AdminRegisterComponent } from './features/admin/admin-register/admin-register.component';
import { ChangeUserRolesComponent } from './features/admin/change-user-roles/change-user-roles.component';
import { ChangeRoleFormComponent } from './features/admin/change-user-roles/change-role-form/change-role-form.component';
import { SuccessfulApplicationsComponent } from './features/housekeeper/successful-applications/successful-applications.component';
import { AllocatedRoomsComponent } from './features/matron/allocated-rooms/allocated-rooms.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { SignupComponent } from './shared/pages/signup/signup.component';
import { roleGuard } from './core/guards/role.guard';
import { AccessDeniedComponent } from './shared/pages/access-denied/access-denied.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'uhb', redirectTo: 'uhb/student/register-student-details', pathMatch: 'full' },
    {
        path: 'uhb', component: DrawerComponent,
        children: [
            {
                path: 'student', component: DashboardComponent, children: [
                    { path: '', component: StudentDashboardComponent, canActivate: [roleGuard], data: { roles: ['Student'] } },
                    { path: 'register-student-details', component: RegisterStudentDetailsComponent, canActivate: [roleGuard], data: { roles: ['Student'] } },
                    { path: 'booking', component: BookingComponent, canActivate: [roleGuard], data: { roles: ['Student'] } },
                    { path: 'application-details', component: ApplicationDetailsComponent, canActivate: [roleGuard], data: { roles: ['Student'] } },
                    { path: 'accommodation-details', component: AccommodationDetailsComponent, canActivate: [roleGuard], data: { roles: ['Student'] } },
                    { path: 'user-details', component: UserDetailsComponent, canActivate: [roleGuard], data: { roles: ['Student'] } }
                ]
            },
            {
                path: 'housekeeper', component: DashboardComponent, children: [
                    { path: '', component: ReviewApplicationsComponent, canActivate: [roleGuard], data: { roles: ['Housekeeper'] } },
                    { path: 'view-application/:id', component: ViewApplicationComponent, canActivate: [roleGuard], data: { roles: ['Housekeeper'] } },
                    { path: 'successful-applications', component: SuccessfulApplicationsComponent, canActivate: [roleGuard], data: { roles: ['Housekeeper'] } },
                    { path: 'user-details', component: UserDetailsComponent, canActivate: [roleGuard], data: { roles: ['Housekeeper'] } }
                ]
            },
            {
                path: 'matron', component: DashboardComponent, children: [
                    { path: '', component: ReviewAllocationsComponent, canActivate: [roleGuard], data: { roles: ['Matron'] } },
                    { path: 'view-allocation/:id', component: ViewAllocationComponent, canActivate: [roleGuard], data: { roles: ['Matron'] } },
                    { path: 'allocated-rooms', component: AllocatedRoomsComponent, canActivate: [roleGuard], data: { roles: ['Matron'] } },
                    { path: 'user-details', component: UserDetailsComponent, canActivate: [roleGuard], data: { roles: ['Matron'] } }
                ]
            },
            {
                path: 'admin', component: DashboardComponent, children: [
                    { path: '', component: AdminDashboardComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
                    { path: 'register', component: AdminRegisterComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
                    { path: 'change-user-roles', component: ChangeUserRolesComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
                    { path: 'change-user-roles/:id', component: ChangeRoleFormComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
                    { path: 'user-details', component: UserDetailsComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } }
                ]
            }
        ]
    },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '**', component: NotfoundComponent }
];

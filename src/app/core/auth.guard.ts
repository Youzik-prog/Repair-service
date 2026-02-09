import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

export const authGuard =  async() => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuth = await authService.isAuthenticated();

    if(isAuth){
      return true;
    }

    if(await authService.isAuthenticated()){
      return true;
    }

    return router.parseUrl('/login');
}

export const guestGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = await authService.isAuthenticated();

  if (isAuth) {
    return router.parseUrl('/home');
  }

  return true;
};
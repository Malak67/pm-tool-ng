import { LoggedInGuard } from './singedin.guard';

class MockRouter {
  navigateByUrl(path) {}
}

describe('LoggedInGuard', () => {
  describe('canActivate', () => {
    let loggedInGuard: LoggedInGuard;
    let authService;
    let router;

    it('should return true for a logged in user', () => {
      authService = { isLoggedIn: () => true };
      router = new MockRouter();
      loggedInGuard = new LoggedInGuard(authService, router);

      expect(loggedInGuard.canActivate()).toEqual(true);
    });

    it('should navigate to login for a logged out user', () => {
      authService = { isLoggedIn: () => false };
      router = new MockRouter();
      loggedInGuard = new LoggedInGuard(authService, router);
      spyOn(router, 'navigateByUrl');

      expect(loggedInGuard.canActivate()).toEqual(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    });
  })
})

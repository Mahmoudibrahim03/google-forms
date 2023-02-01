import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export abstract class AuthModel {
  readonly BASE_URL: string = environment.BASE_URL;
  abstract LOGIN_END_POINT: string;
  abstract isAdmin: BehaviorSubject<boolean>;

  // Login user with password ...
  abstract login(body: { password: string }): void;

  abstract logout(): void;
}

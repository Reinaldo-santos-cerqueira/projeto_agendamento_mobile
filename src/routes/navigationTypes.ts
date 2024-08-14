import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackFuncionarioParams} from './appFuncionarioStack.routes';
import {AuthStackParams} from './authStack.routes';
import {AppStackPacienteParams} from './appPacienteStack.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends AuthStackParams,
        AppStackFuncionarioParams {}
  }
}
export type AppFuncionarioScreenProps<
  RouteName extends keyof AppStackFuncionarioParams,
> = NativeStackScreenProps<AppStackFuncionarioParams, RouteName>;
export type AppPacienteScreenProps<
  RouteName extends keyof AppStackPacienteParams,
> = NativeStackScreenProps<AppStackPacienteParams, RouteName>;
export type AuthScreenProps<RouteName extends keyof AuthStackParams> =
  NativeStackScreenProps<AuthStackParams, RouteName>;

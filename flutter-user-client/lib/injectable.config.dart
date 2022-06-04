// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;

import 'application/auth/auth/auth_bloc.dart' as _i25;
import 'application/auth/register_form/register_form_bloc.dart' as _i19;
import 'application/auth/request_reset_form/request_reset_form_bloc.dart'
    as _i20;
import 'application/auth/sign_in_form/sign_in_form_bloc.dart' as _i21;
import 'application/efpl_stats/efpl_stats_bloc.dart' as _i27;
import 'application/epl_stats/epl_stats_bloc.dart' as _i26;
import 'application/fixture/fixture_bloc.dart' as _i5;
import 'application/my_team/myteam_bloc.dart' as _i32;
import 'application/player/player_bloc.dart' as _i33;
import 'application/points/points_bloc.dart' as _i17;
import 'application/transfer/transfer_bloc.dart' as _i22;
import 'application/util/util_bloc.dart' as _i24;
import 'domain/auth/i_auth_repository.dart' as _i8;
import 'domain/efpl_stats/i_efpl_stats_facade..dart' as _i10;
import 'domain/epl_stats/i_epl_stats_repository.dart' as _i12;
import 'domain/fixture/i_fixture_facade.dart' as _i6;
import 'domain/my_team/i_my_team_repository.dart' as _i28;
import 'domain/player/i_player_repository.dart' as _i30;
import 'domain/points/i_points_facade.dart' as _i18;
import 'domain/transfer/i_user_players_facade.dart' as _i23;
import 'infrastructure/auth/auth_repository.dart' as _i9;
import 'infrastructure/efpl_stats/efpl_stats_remote_data_provider.dart' as _i3;
import 'infrastructure/efpl_stats/efpl_stats_repository.dart' as _i11;
import 'infrastructure/epl_stats/epl_stats_remote_data_provider.dart' as _i4;
import 'infrastructure/epl_stats/epl_stats_repository.dart' as _i13;
import 'infrastructure/my_team/my_team_local_data_provider.dart' as _i14;
import 'infrastructure/my_team/my_team_remote_data_provider.dart' as _i15;
import 'infrastructure/my_team/my_team_repository.dart' as _i29;
import 'infrastructure/player/player_remote_data_provider.dart' as _i16;
import 'infrastructure/player/player_repository.dart' as _i31;
import 'services/http_instance.dart'
    as _i7; // ignore_for_file: unnecessary_lambdas

// ignore_for_file: lines_longer_than_80_chars
/// initializes the registration of provided dependencies inside of [GetIt]
_i1.GetIt $initGetIt(_i1.GetIt get,
    {String? environment, _i2.EnvironmentFilter? environmentFilter}) {
  final gh = _i2.GetItHelper(get, environment, environmentFilter);
  gh.factory<_i3.EFPLStatsRemoteDataProvider>(
      () => _i3.EFPLStatsRemoteDataProvider());
  gh.factory<_i4.EPLStatsRemoteDataProvider>(
      () => _i4.EPLStatsRemoteDataProvider());
  gh.lazySingleton<_i5.FixtureBloc>(
      () => _i5.FixtureBloc(get<_i6.IFixtureRepository>()));
  gh.factory<_i7.HTTPInstance>(() => _i7.HTTPInstance());
  gh.lazySingleton<_i8.IAuthRepository>(() => _i9.AuthRepository());
  gh.lazySingleton<_i10.IEFPLStatsRepository>(() => _i11.EFPLStatsRepository());
  gh.lazySingleton<_i12.IEPLStatsRepository>(
      () => _i13.EPLStatsRepository(get<_i4.EPLStatsRemoteDataProvider>()));
  gh.factory<_i14.MyTeamLocalDataProvider>(
      () => _i14.MyTeamLocalDataProvider());
  gh.factory<_i15.MyTeamRemoteDataProvider>(
      () => _i15.MyTeamRemoteDataProvider());
  gh.factory<_i16.PlayerRemoteDataProvider>(
      () => _i16.PlayerRemoteDataProvider());
  gh.lazySingleton<_i17.PointsBloc>(
      () => _i17.PointsBloc(get<_i18.IPointInfoRepository>()));
  gh.factory<_i19.RegisterFormBloc>(
      () => _i19.RegisterFormBloc(get<_i8.IAuthRepository>()));
  gh.factory<_i20.RequestResetFormBloc>(
      () => _i20.RequestResetFormBloc(get<_i8.IAuthRepository>()));
  gh.factory<_i21.SignInFormBloc>(
      () => _i21.SignInFormBloc(get<_i8.IAuthRepository>()));
  gh.lazySingleton<_i22.TransferBloc>(
      () => _i22.TransferBloc(get<_i23.ITransferRepository>()));
  gh.lazySingleton<_i24.UtilBloc>(() => _i24.UtilBloc());
  gh.factory<_i25.AuthBloc>(() => _i25.AuthBloc(get<_i8.IAuthRepository>()));
  gh.lazySingleton<_i26.EPLStatsBloc>(
      () => _i26.EPLStatsBloc(get<_i12.IEPLStatsRepository>()));
  gh.lazySingleton<_i27.EfplStatsBloc>(
      () => _i27.EfplStatsBloc(get<_i10.IEFPLStatsRepository>()));
  gh.lazySingleton<_i28.IMyTeamRepository>(() => _i29.MyTeamRepository(
      get<_i14.MyTeamLocalDataProvider>(),
      get<_i15.MyTeamRemoteDataProvider>()));
  gh.lazySingleton<_i30.IPlayerRepository>(
      () => _i31.PlayerRepository(get<_i16.PlayerRemoteDataProvider>()));
  gh.lazySingleton<_i32.MyTeamBloc>(
      () => _i32.MyTeamBloc(get<_i28.IMyTeamRepository>()));
  gh.factory<_i33.PlayerBloc>(
      () => _i33.PlayerBloc(get<_i30.IPlayerRepository>()));
  return get;
}

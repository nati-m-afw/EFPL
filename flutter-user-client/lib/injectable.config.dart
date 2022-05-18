// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;

import 'application/fixture/fixture_bloc.dart' as _i3;
import 'application/points/points_bloc.dart' as _i6;
import 'application/transfer/transfer_bloc.dart' as _i8;
import 'application/util/util_bloc.dart' as _i10;
import 'domain/fixture/i_fixture_facade.dart' as _i4;
import 'domain/points/i_points_facade.dart' as _i7;
import 'domain/transfer/i_user_players_facade.dart' as _i9;
import 'services/http_instance.dart'
    as _i5; // ignore_for_file: unnecessary_lambdas

// ignore_for_file: lines_longer_than_80_chars
/// initializes the registration of provided dependencies inside of [GetIt]
_i1.GetIt $initGetIt(_i1.GetIt get,
    {String? environment, _i2.EnvironmentFilter? environmentFilter}) {
  final gh = _i2.GetItHelper(get, environment, environmentFilter);
  gh.lazySingleton<_i3.FixtureBloc>(
      () => _i3.FixtureBloc(get<_i4.IFixtureRepository>()));
  gh.factory<_i5.HTTPInstance>(() => _i5.HTTPInstance());
  gh.lazySingleton<_i6.PointsBloc>(
      () => _i6.PointsBloc(get<_i7.IPointInfoRepository>()));
  gh.lazySingleton<_i8.TransferBloc>(
      () => _i8.TransferBloc(get<_i9.ITransferRepository>()));
  gh.lazySingleton<_i10.UtilBloc>(() => _i10.UtilBloc());
  return get;
}

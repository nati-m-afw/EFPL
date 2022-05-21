part of 'myteam_bloc.dart';

@freezed
abstract class MyTeamEvent with _$MyTeamEvent {
  const factory MyTeamEvent.loadMyTeam(String userId, String gameweekId) =
      _LoadMyTeam;
  const factory MyTeamEvent.transferOptionsRequested(
      int playerId, String position, bool isSub) = _TransferOptionsRequested;
  const factory MyTeamEvent.transferConfirmed(
      int toBeTransferredIn, String position, bool isSub) = _TransferConfirmed;
  const factory MyTeamEvent.saveMyTeam(MyTeam myTeam, String userId) =
      _SaveMyTeam;
}

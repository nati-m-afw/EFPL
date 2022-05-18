import 'package:efpl/injectable.dart';
import 'package:efpl/presentation/core/app_widget.dart';
import 'package:efpl/presentation/team/team_view.dart';
import 'package:efpl/services/test_data_providers.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:injectable/injectable.dart';

Future main() async {
  await dotenv.load(fileName: "../.env");
  await Hive.initFlutter();
  await Hive.openBox("myTeamCache");
  configureInjection(Environment.prod);
  // testDataProviders();
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("My Team"),
        ),
        body: const TeamView(),
      ),
    ),
  );
  // runApp(const AppWidget());
}

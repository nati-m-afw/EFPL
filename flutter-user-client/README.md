# EFPL User Client
![Transfers Page](assets/screenshots/main.jpg)
![Three Pages](assets/screenshots//three-pages.jpg)


<br>

## Overview
Flutter mobile app for the Ethiopian Fantasy Football League.
- [Flutter Version](#flutter-version)
- [File Structure](#file-structure)
- [Architecture](#architecture)
- [Configuration Files](#configuration-files)
- [Project Setup](#project-setup)

<br>

## Flutter Version
Flutter **2.10.2** • channel stable • https://github.com/flutter/flutter.git

Framework • revision 097d3313d8 (2 weeks ago) • 2022-02-18 19:33:08 -0600

Engine • revision a83ed0e5e3

Tools • Dart 2.16.1 • DevTools 2.9.2

<br>

## File Structure
- __infrastructure/__ - Repositiory and data sources
- __domain/__ - Value objects and failures
- __application/__ - BLoC logic
- __presentation/__ - UI elements
- __services/__ - Helper functions
- __locales/__ - Localization files

<br>

## Architecture
![DDD Architecture](https://resocoder.com/wp-content/uploads/2020/03/DDD-Flutter-Diagram-v3.svg)

For further explanation [you read this article.](https://resocoder.com/2020/03/09/flutter-firebase-ddd-course-1-domain-driven-design-principles/)


<br>

## Configuration Files
- __analysis_options.yaml__: Dart analyzer liniting settings
    - Trailing commas 

<br>

## Project setup
### Add .env file

```
API=YOUR_EXPRESS_SERVER_ADDRESS:PORT
```

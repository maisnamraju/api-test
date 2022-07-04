import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import {
  ControllerInjector,
  EventEmitterInjector,
  GuardInjector,
  LoggerInjector,
  OpenTelemetryModule,
  PipeInjector,
  ScheduleInjector,
} from '@metinseylan/nestjs-opentelemetry';

@Module({
  imports: [
    OpenTelemetryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        applicationName: `zid-user-api`,
        metricInterval: 1000,
        traceAutoInjectors: [
          ControllerInjector,
          GuardInjector,
          EventEmitterInjector,
          ScheduleInjector,
          PipeInjector,
          LoggerInjector,
        ],
        // need to configure to zipkin and prometheus later for user in metrics
        // spanProcessor: new SimpleSpanProcessor(
        //   new ZipkinExporter({
        //     url: configService.get<string>('ZIPKIN_URL'),
        //   }),
        // ),
      }),
    }),
  ],
})
export class TelemetryModule {}

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
  ActiveHandlesMetric,
  ActiveHandlesTotalMetric,
  ControllerInjector,
  EventEmitterInjector,
  GuardInjector,
  HttpRequestDurationSeconds,
  LoggerInjector,
  OpenTelemetryModule,
  PipeInjector,
  ProcessMaxFdsMetric,
  ProcessOpenFdsMetric,
  ProcessStartTimeMetric,
  ResourceMetric,
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
        metricAutoObservers: [
          ResourceMetric,
          ProcessStartTimeMetric,
          ProcessOpenFdsMetric,
          ProcessMaxFdsMetric,
          ActiveHandlesMetric,
          ActiveHandlesTotalMetric,
          HttpRequestDurationSeconds,
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

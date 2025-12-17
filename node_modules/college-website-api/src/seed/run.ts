import { connectMongo, disconnectMongo } from "../lib/mongo.js";
import { env } from "../config/env.js";
import {
  SiteSettingsModel,
  ProgramModel,
  StatMetricModel,
  EventModel,
  TestimonialModel,
} from "../models/index.js";
import {
  siteSettingsSeed,
  programSeed,
  statsSeed,
  eventsSeed,
  testimonialsSeed,
} from "./content.js";

async function seed() {
  await connectMongo(env.mongoUri);

  await SiteSettingsModel.deleteMany({});
  await ProgramModel.deleteMany({});
  await StatMetricModel.deleteMany({});
  await EventModel.deleteMany({});
  await TestimonialModel.deleteMany({});

  await SiteSettingsModel.create(siteSettingsSeed);
  await ProgramModel.insertMany(programSeed);
  await StatMetricModel.insertMany(statsSeed);
  await EventModel.insertMany(eventsSeed);
  await TestimonialModel.insertMany(testimonialsSeed);

  console.log("[seed] database seeded successfully");
  await disconnectMongo();
}

seed().catch((error) => {
  console.error("[seed] failed:", error);
  process.exit(1);
});



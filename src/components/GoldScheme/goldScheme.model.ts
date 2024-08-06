import { Schema, model } from "mongoose";
import {
  IGoldScheme,
  IGoldSchemeModel,
  NewGoldSchemeParams,
} from "./goldScheme.interface";

const investmentSchema = {
  year: Number,
  month: Number,
  date: Date,
  amount: Number,
};

const GoldSchemeSchema: Schema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    period: Number,
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    investments: [investmentSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

GoldSchemeSchema.statics = {
  addGoldScheme: async function (data: NewGoldSchemeParams) {
    try {
      const goldScheme = new GoldScheme(data);
      const goldSchemeDoc = await goldScheme.save();
      return goldScheme;
    } catch (err) {
      throw err;
    }
  },
  getGoldSchemeList: async function (matchQuery) {
    try {
      const goldScheme = await this.findOne(matchQuery);
      return goldScheme;
    } catch (err) {
      throw err;
    }
  },

  getGoldSchemeById: async function (query) {
    try {
      const goldScheme = await this.findById(query);
      return goldScheme;
    } catch (err) {
      throw err;
    }
  },

  getGoldSchemeByQuery: async function (matchQuery) {
    try {
      const goldScheme = await this.findOne(matchQuery);
      return goldScheme;
    } catch (err) {
      throw err;
    }
  },

  updateSchemeInvestmentById: async function (schemeId, data) {
    try {
      const aboutUs = await this.findByIdAndUpdate(
        schemeId,
        { $push: { investments: data } },
        { new: true }
      );
      return aboutUs;
    } catch (err) {
      throw err;
    }
  },

  updateSchemeById: async function (schemeId, data) {
    try {
      const aboutUs = await this.findByIdAndUpdate(
        schemeId,
        { $set: data },
        { new: true }
      );
      return aboutUs;
    } catch (err) {
      throw err;
    }
  },
};

const GoldScheme: IGoldSchemeModel = model<IGoldScheme, IGoldSchemeModel>(
  "GoldScheme",
  GoldSchemeSchema
);
export default GoldScheme;

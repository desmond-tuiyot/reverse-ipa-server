import IpaToWord from "../models/ipaToWord.js";
import WordToIpa from "../models/wordToIpa.js";
import { fr_QC_WordToIpa } from "../models/french.js";

export const fetchResults = async (req, res) => {
  const { query, type, position } = req.query;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  try {
    let results;
    const regexTerm = generateRegex(position, query);
    if (type === "toWord") {
      results = await IpaToWord.find({
        ipaTranscriptionStripped: { $regex: regexTerm },
      })
        .skip(skip)
        .limit(limit)
        .exec();
    } else if (type === "toIpa") {
      results = await WordToIpa.find({
        word: { $regex: regexTerm },
      })
        .skip(skip)
        .limit(limit)
        .exec();
    }

    res.status(200).json(results ? results : []);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getSkipAndLimit = () => {};

const generateRegex = (position, query) => {
  if (position === "anywhere") {
    return query;
  } else if (position === "start") {
    return `^${query}`;
  } else if (position === "middle") {
    return `^(?!^${query})(?!.*${query}$)(?=.*${query}.*).*$`;
  } else if (position === "end") {
    return `${query}$`;
  }
};

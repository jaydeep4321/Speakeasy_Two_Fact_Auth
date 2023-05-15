const Quiz = require("../models/quizModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//=================CREATE QUIZ===============//
exports.createQuiz = catchAsync(async (req, res, next) => {
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    questions: req.body.questions,
  });

  await quiz.save();

  res
    .status(201)
    .json({ error: false, message: "Quiz has been created!", data: quiz });
});

//=================GET ALL QUIZ==============//
exports.getAllQuizzes = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find().populate("questions");

  res
    .status(200)
    .json({ error: false, message: "Quizzes found!", data: quizzes });
});

//=================GET QUIZ BY ID============//
exports.getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id).populate("questions");

  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }

  res.status(200).json({ error: false, data: quiz });
});

//==================UPDATE==================//
exports.updateQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      questions: req.body.questions,
    },
    { new: true }
  );

  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }

  res.status(200).json({ error: false, data: quiz });
});

//==================DELETE==================//
exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, {
    $set: { active: false },
  });

  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }

  res.status(200).json({ error: false, message: "Quiz deleted successfully" });
});

//============JUST FOR REFRENCE===========//
// exports.createQuiz = async (req, res, next) => {
//   try {
//     const quiz = new Quiz({
//       title: req.body.title,
//       description: req.body.description,
//       duration: req.body.duration,
//       questions: req.body.questions,
//     });

//     await quiz.save();

//     res
//       .status(201)
//       .json({ error: false, message: "Quiz has been created!", data: quiz });
//   } catch (error) {
//     res.status(400).json({ error: true, message: error.message });
//   }
// };

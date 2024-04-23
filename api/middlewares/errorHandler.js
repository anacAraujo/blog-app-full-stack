export function errorHandlerMiddleware(error, req, res, next) {
  req.log.error(error);

  switch (error.name) {
    case "ValidationError":
      const message = error.details[0].message;
      res.status(400).json({ message });
      break;
    case "JsonWebTokenError":
      res.status(403).json({ message: "Token is not valid!" });
      break;
    default:
      res.status(500).json({ message: "Internal server error!" });
  }
}

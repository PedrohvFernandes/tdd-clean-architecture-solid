/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// Todos types de resposta dos http: 200, 201, 204, 400, 401, 403, 404, 500

// Enums em JavaScript são uma forma especial de definir um conjunto de valores nomeados.
export enum HttpStatusCode {
  NO_CONTENT = 204,
  OK = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}

export type HttpResponse = {
  // statusCode: HttpStatusCode.unauthorized
  statusCode: HttpStatusCode
  // A resposta do response pode retornar qualquer coisa
  body?: any
}

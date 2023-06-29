// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const responseMessage = require('./utils/constant-messages');

const doc = {
  info: {
    title: 'Library',
    description: 'Open Api Example'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    '@schemas': {
      memberBody: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'Member name'
          },
          lastName: {
            type: 'string',
            example: 'Member surname'
          },
          email: {
            format: 'email',
            type: 'string',
            example: 'member@gmail.com'
          },
          password: {
            type: 'string',
            example: 'password'
          },
          address: {
            type: 'string',
            example: 'Endicott, NY 13760'
          },
          dateOfBirth: {
            type: 'date',
            example: '1999-01-01'
          }
        }
      },

      memberUpdateBody: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'Member name'
          },
          lastName: {
            type: 'string',
            example: 'Member surname'
          },
          address: {
            type: 'string',
            example: 'Endicott, NY 13760'
          },
          dateOfBirth: {
            type: 'date',
            example: '1999-01-01'
          }
        }
      },

      memberResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          address: {
            type: 'string',
            example: 'Endicott, NY 13760'
          },
          dateOfBirth: {
            type: 'date',
            example: '1999-01-01'
          },
          userId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          isActive: {
            type: 'boolean',
            example: true
          },
          subscriptionExpirationDate: {
            type: 'date',
            example: '2023-03-26'
          },
          bookLimit: {
            type: 'number',
            example: null
          },
          history: {
            type: 'items',
            example: [{
              end: '2023-03-26',
              start: '2023-02-24'
            }]
          },
          createdAt: {
            type: 'date',
            example: new Date()
          },
          updatedAt: {
            type: 'date',
            example: new Date()
          },
          User: {
            type: 'object',
            $ref: '#/components/schemas/userResponse'
          }
        }
      },

      memberResponseWithoutId: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
            example: 'Endicott, NY 13760'
          },
          dateOfBirth: {
            type: 'date',
            example: '1999-01-01'
          },
          isActive: {
            type: 'boolean',
            example: true
          },
          subscriptionExpirationDate: {
            type: 'date',
            example: '2023-03-26'
          },
          bookLimit: {
            type: 'number',
            example: null
          },
          history: {
            type: 'items',
            example: [{
              end: '2023-03-26',
              start: '2023-02-24'
            }]
          },
          createdAt: {
            type: 'date',
            example: new Date()
          },
          updatedAt: {
            type: 'date',
            example: new Date()
          },
          User: {
            type: 'object',
            $ref: '#/components/schemas/userResponseWithoutId'
          }
        }

      },

      librarianBody: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'Librarian name'
          },
          lastName: {
            type: 'string',
            example: 'Librarian surname'
          },
          email: {
            format: 'email',
            type: 'string',
            example: 'librarian@gmail.com'
          },
          password: {
            type: 'string',
            example: 'password'
          },
          address: {
            type: 'string',
            example: 'Endicott, NY 13760'
          },
          dateOfBirth: {
            type: 'date',
            example: '1999-01-01'
          }
        }
      },

      librarianUpdateBody: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'Librarian name'
          },
          lastName: {
            type: 'string',
            example: 'Librarian surname'
          },
          address: {
            type: 'string',
            example: 'Endicott, NY 13760'
          },
          dateOfBirth: {
            type: 'date',
            example: '1999-01-01'
          }
        }
      },

      librarianResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          address: {
            type: 'string',
            example: 'Endicott, NY 13760'
          },
          dateOfBirth: {
            type: 'date',
            example: '1999-01-01'
          },
          userId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          isActive: {
            type: 'boolean',
            example: true
          },
          createdAt: {
            type: 'date',
            example: new Date()
          },
          updatedAt: {
            type: 'date',
            example: new Date()
          },
          User: {
            type: 'object',
            $ref: '#/components/schemas/userResponse'
          }
        }
      },

      adminBody: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'Admin name'
          },
          lastName: {
            type: 'string',
            example: 'Admin surname'
          },
          email: {
            format: 'email',
            type: 'string',
            example: 'admin@gmail.com'
          },
          password: {
            type: 'string',
            example: 'password'
          }
        }
      },

      adminUpdateBody: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'Admin name'
          },
          lastName: {
            type: 'string',
            example: 'Admin surname'
          }
        }
      },

      adminResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          userId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          isActive: {
            type: 'boolean',
            example: true
          },
          createdAt: {
            type: 'date',
            example: new Date()
          },
          updatedAt: {
            type: 'date',
            example: new Date()
          },
          User: {
            type: 'object',
            $ref: '#/components/schemas/userResponse'
          }
        }
      },

      userResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          firstName: {
            type: 'string',
            example: 'name'
          },
          lastName: {
            type: 'string',
            example: 'surname'
          },
          email: {
            format: 'email',
            type: 'string',
            example: 'user@gmail.com'
          },
          roleId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          createdAt: {
            type: 'date',
            example: new Date()
          },
          updatedAt: {
            type: 'date',
            example: new Date()
          }
        }
      },

      userResponseWithoutId: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'name'
          },
          lastName: {
            type: 'string',
            example: 'surname'
          },
          email: {
            format: 'email',
            type: 'string',
            example: 'user@gmail.com'
          },
          createdAt: {
            type: 'date',
            example: new Date()
          },
          updatedAt: {
            type: 'date',
            example: new Date()
          }
        }
      },

      subscriptionDateBody: {
        type: 'object',
        properties: {
          date: {
            type: 'date',
            example: '2023-04-27'
          }
        }
      },

      loginBody: {
        type: 'object',
        properties: {
          email: {
            format: 'email',
            type: 'string',
            example: 'test@gmail.com'
          },
          password: {
            type: 'string',
            example: 'test123'
          }
        }
      },

      profileData: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            $ref: '#/components/schemas/memberResponseWithoutId'
          }
        }
      },

      passwordUpdate: {
        type: 'object',
        properties: {

          oldPassword: {
            type: 'string',
            example: 'password'
          },
          newPassword: {
            type: 'string',
            example: 'password'
          }
        }
      },

      passwordCreate: {
        type: 'object',
        properties: {
          newPassword: {
            type: 'string',
            example: 'password'
          }
        }
      },
      genreBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              totalItems: {
                type: 'integer',
                example: 4
              },
              modelRows: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'uuid',
                      example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                    },
                    name: {
                      type: 'string',
                      example: 'Genre name'
                    },
                    Books: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'uuid',
                            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                          },
                          isbn: {
                            type: 'string',
                            example: '0738531367'
                          },
                          title: {
                            type: 'string',
                            example: 'Book title'
                          },
                          dateOfRelease: {
                            type: 'date',
                            example: '2022-12-12'
                          },
                          tags: {
                            type: 'jsonb',
                            example: ['first', 'second', 'third']
                          },
                          authorId: {
                            type: 'uuid',
                            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                          },
                          isActive: {
                            type: 'boolean',
                            example: true
                          },
                          BookGenre: {
                            type: 'object',
                            properties: {
                              genreId: {
                                type: 'uuid',
                                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                              },
                              bookId: {
                                type: 'uuid',
                                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              totalPages: {
                type: 'integer',
                example: 3
              },
              currentPage: {
                type: 'integer',
                example: 1
              }
            }
          }
        }
      },

      specificGenreBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'uuid',
                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
              },
              name: {
                type: 'string',
                example: 'Genre name'
              },
              Books: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'uuid',
                      example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                    },
                    isbn: {
                      type: 'string',
                      example: '0738531367'
                    },
                    title: {
                      type: 'string',
                      example: 'Book title'
                    },
                    dateOfRelease: {
                      type: 'date',
                      example: '2022-12-12'
                    },
                    tags: {
                      type: 'jsonb',
                      example: ['first', 'second', 'third']
                    },
                    authorId: {
                      type: 'uuid',
                      example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                    },
                    isActive: {
                      type: 'boolean',
                      example: true
                    },
                    BookGenre: {
                      type: 'object',
                      properties: {
                        genreId: {
                          type: 'uuid',
                          example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                        },
                        bookId: {
                          type: 'uuid',
                          example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

      genreFilterBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'uuid',
                  example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                },
                name: {
                  type: 'string',
                  example: 'Genre name'
                }
              }
            }
          }
        }
      },

      genreBodyRequest: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'Genre name'
          }
        }
      },

      bookGenreBodyRequest: {
        type: 'object',
        required: ['genreId', 'bookId'],
        properties: {
          genreId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          bookId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          }
        }
      },

      authorBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              totalItems: {
                type: 'integer',
                example: 4
              },
              modelRows: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'uuid',
                      example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                    },
                    name: {
                      type: 'string',
                      example: 'Author name'
                    },
                    isActive: {
                      type: 'boolean',
                      example: true
                    },
                    dateOfBirth: {
                      type: 'date',
                      example: '1997-12-12'
                    },
                    Books: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'uuid',
                            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                          },
                          isbn: {
                            type: 'string',
                            example: '0738531367'
                          },
                          title: {
                            type: 'string',
                            example: 'Book title'
                          },
                          dateOfRelease: {
                            type: 'date',
                            example: '2022-12-12'
                          },
                          tags: {
                            type: 'jsonb',
                            example: ['first', 'second', 'third']
                          },
                          authorId: {
                            type: 'uuid',
                            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                          },
                          isActive: {
                            type: 'boolean',
                            example: true
                          }
                        }
                      }
                    }
                  }
                }
              },
              totalPages: {
                type: 'integer',
                example: 3
              },
              currentPage: {
                type: 'integer',
                example: 1
              }
            }
          }
        }
      },

      specificAuthorBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'uuid',
                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
              },
              name: {
                type: 'string',
                example: 'Author name'
              },
              isActive: {
                type: 'boolean',
                example: true
              },
              dateOfBirth: {
                type: 'date',
                example: '1997-12-12'
              }
            }
          }
        }
      },

      updatedAuthorBodyResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Author successfully updated!'
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'uuid',
                  example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                },
                name: {
                  type: 'string',
                  example: 'Author name'
                },
                isActive: {
                  type: 'boolean',
                  example: true
                },
                dateOfBirth: {
                  type: 'date',
                  example: '1997-12-12'
                }
              }
            }
          }
        }
      },

      authorBodyRequest: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'Author name'
          },
          dateOfBirth: {
            type: 'date',
            example: '1997-12-12'
          }
        }
      },

      updatedAuthorBodyRequest: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'Author name'
          },
          dateOfBirth: {
            type: 'date',
            example: '1997-12-12'
          },
          isActive: {
            type: 'boolean',
            example: true
          }
        }
      },

      bookBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              totalItems: {
                type: 'integer',
                example: 4
              },
              modelRows: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'uuid',
                      example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                    },
                    isbn: {
                      type: 'string',
                      example: '0738531367'
                    },
                    title: {
                      type: 'string',
                      example: 'Book title'
                    },
                    dateOfRelease: {
                      type: 'date',
                      example: '2022-12-12'
                    },
                    tags: {
                      type: 'jsonb',
                      example: ['first', 'second', 'third']
                    },
                    authorId: {
                      type: 'uuid',
                      example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                    },
                    isActive: {
                      type: 'boolean',
                      example: true
                    },
                    Author: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'uuid',
                          example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                        },
                        name: {
                          type: 'string',
                          example: 'Author name'
                        },
                        isActive: {
                          type: 'boolean',
                          example: true
                        },
                        dateOfBirth: {
                          type: 'date',
                          example: '1997-12-12'
                        }
                      }
                    },
                    Genres: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'uuid',
                            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                          },
                          name: {
                            type: 'string',
                            example: 'Genre name'
                          },
                          BookGenre: {
                            type: 'object',
                            properties: {
                              genreId: {
                                type: 'uuid',
                                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                              },
                              bookId: {
                                type: 'uuid',
                                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              totalPages: {
                type: 'integer',
                example: 3
              },
              currentPage: {
                type: 'integer',
                example: 1
              }
            }
          }
        }
      },

      filteredBookByTitleBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'uuid',
                  example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                },
                isbn: {
                  type: 'string',
                  example: '0738531367'
                },
                title: {
                  type: 'string',
                  example: 'Book title'
                },
                dateOfRelease: {
                  type: 'date',
                  example: '2022-12-12'
                },
                tags: {
                  type: 'jsonb',
                  example: ['first', 'second', 'third']
                },
                authorId: {
                  type: 'uuid',
                  example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                },
                isActive: {
                  type: 'boolean',
                  example: true
                }
              }
            }
          }
        }
      },

      specificBookBodyResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'uuid',
                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
              },
              isbn: {
                type: 'string',
                example: '0738531367'
              },
              title: {
                type: 'string',
                example: 'Book title'
              },
              dateOfRelease: {
                type: 'date',
                example: '2022-12-12'
              },
              tags: {
                type: 'jsonb',
                example: ['first', 'second', 'third']
              },
              authorId: {
                type: 'uuid',
                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
              },
              isActive: {
                type: 'boolean',
                example: true
              },
              Author: {
                type: 'object',
                properties: {
                  id: {
                    type: 'uuid',
                    example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                  },
                  name: {
                    type: 'string',
                    example: 'Author name'
                  },
                  isActive: {
                    type: 'boolean',
                    example: true
                  },
                  dateOfBirth: {
                    type: 'date',
                    example: '1997-12-12'
                  }
                }
              },
              Genres: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'uuid',
                      example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                    },
                    name: {
                      type: 'string',
                      example: 'Genre name'
                    },
                    BookGenre: {
                      type: 'object',
                      properties: {
                        genreId: {
                          type: 'uuid',
                          example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                        },
                        bookId: {
                          type: 'uuid',
                          example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

      updatedBookBodyResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Book successfully updated!'
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'uuid',
                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
              },
              isbn: {
                type: 'string',
                example: '0738531367'
              },
              title: {
                type: 'string',
                example: 'Book title'
              },
              dateOfRelease: {
                type: 'date',
                example: '2022-12-12'
              },
              tags: {
                type: 'jsonb',
                example: ['first', 'second', 'third']
              },
              authorId: {
                type: 'uuid',
                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
              },
              isActive: {
                type: 'boolean',
                example: true
              }
            }
          }
        }
      },

      bookBodyRequest: {
        type: 'object',
        required: ['title', 'dateOfRelease', 'authorId'],
        properties: {
          isbn: {
            type: 'string',
            example: '0738531367'
          },
          title: {
            type: 'string',
            example: 'Book Title'
          },
          dateOfRelease: {
            type: 'date',
            example: '1997-12-12'
          },
          tags: {
            type: 'jsonb',
            example: ['first', 'second', 'third']
          },
          authorId: {
            type: 'uuid',
            example: '124747a4-ee03-445c-a66c-c8ba510839bb'
          },
          genreId: {
            type: 'uuid',
            example: '124747a4-ee03-445c-a66c-c8ba510839bb'
          }
        }
      },

      updatedBookBodyRequest: {
        type: 'object',
        required: ['title', 'dateOfRelease', 'authorId'],
        properties: {
          isbn: {
            type: 'string',
            example: '0738531367'
          },
          title: {
            type: 'string',
            example: 'Book Title'
          },
          dateOfRelease: {
            type: 'date',
            example: '1997-12-12'
          },
          tags: {
            type: 'jsonb',
            example: ['first', 'second', 'third']
          },
          isActive: {
            type: 'boolean',
            example: true
          },
          authorId: {
            type: 'uuid',
            example: '124747a4-ee03-445c-a66c-c8ba510839bb'
          }
        }
      },

      bookISBNBodyRequest: {
        type: 'object',
        required: ['isbn'],
        properties: {
          isbn: {
            type: 'string',
            example: '0738531367'
          }
        }
      },

      associationNotFound: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Not Found'
          },
          details: {
            type: 'string',
            example: 'Association with alias \'AssociationName\' does not exist on \'ModelName\''
          }
        }
      },

      validationError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Invalid input'
          },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                msg: {
                  type: 'string',
                  example: 'Value after \'page\' must be a positive integer'
                },
                param: {
                  type: 'string',
                  example: 'page'
                },
                location: {
                  type: 'string',
                  example: 'query'
                }
              }
            }
          }
        }
      },

      unauthorizedError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized access'
          },
          details: {
            type: 'string',
            example: responseMessage.missingAuthorization
          }
        }
      },

      permissionError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Forbidden'
          },
          details: {
            type: 'string',
            example: responseMessage.UserTypeAndIdAndPermission
          }
        }
      },

      serverError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Internal server error'
          }
        }
      },
      memberOnlyResponse: {
        type: 'object',
        properties: {
          userId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          User: {
            type: 'object',
            properties: {
              email: {
                format: 'email',
                type: 'string',
                example: 'member@gmail.com'
              }
            }
          }
        }
      },
      lendingBody: {
        type: 'object',
        properties: {
          actionId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bfa'
          },
          memberId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bfb'
          },
          bookId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bfc'
          }
        }
      },
      bookOnlyResponse: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Book title'
          }
        }
      },
      lendingResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          memberId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          bookId: {
            type: 'uuid',
            example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
          },
          lentDate: {
            type: 'string',
            example: '2023-01-01'
          },
          expiredDate: {
            type: 'string',
            example: '2023-01-02'
          },
          returnedDate: {
            type: 'string',
            example: '2023-01-03'
          },
          lateFee: {
            type: 'string',
            example: '0.10'
          },
          isActive: {
            type: 'boolean',
            example: 'true'
          },
          createdAt: {
            type: 'date',
            example: new Date()
          },
          updatedAt: {
            type: 'date',
            example: new Date()
          },
          Book: {
            type: 'object',
            $ref: '#/components/schemas/bookOnlyResponse'
          },
          Member: {
            type: 'object',
            $ref: '#/components/schemas/memberOnlyResponse'
          }
        }
      },
      lendingSimplifiedResponse: {
        type: 'object',
        properties: {
          lentDate: {
            type: 'string',
            example: '2023-01-01'
          },
          expiredDate: {
            type: 'string',
            example: '2023-01-02'
          },
          returnedDate: {
            type: 'string',
            example: '2023-01-03'
          },
          lateFee: {
            type: 'string',
            example: '0.10'
          },
          isActive: {
            type: 'boolean',
            example: 'true'
          },
          Book: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                example: 'Book title'
              }
            }
          },
          Member: {
            type: 'object',
            properties: {
              userId: {
                type: 'uuid',
                example: '4aa78666-c9cb-4020-aaf1-5f623a854bff'
              },
              User: {
                type: 'object',
                properties: {
                  firstName: {
                    type: 'string',
                    example: 'name'
                  },
                  lastName: {
                    type: 'string',
                    example: 'surname'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

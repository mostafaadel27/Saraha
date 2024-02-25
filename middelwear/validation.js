const dataMethods = ['body', 'params', 'query', 'file', 'files', 'headers']

export const validation = (schema) => {

    return (req, res, next) => {
        try {
            const validationArr = []
            dataMethods.forEach(key => {
                if (schema[key]) {
                    const validationResult = schema[key].validate(req[key],
                        { abortEarly: true })
                    if (validationResult?.error?.details) {
                        validationArr.push(validationResult.error.details)
                    }
                }
            })

            if (validationArr.length) {
                res.status(400).json({ message: "validation error", validationArr })
            } else {
                next()
            }
        } catch (error) {
            res.status(500).json({ message: "catch error", error })
        }

    }
}
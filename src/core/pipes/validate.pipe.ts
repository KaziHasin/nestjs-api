import { Injectable, ArgumentMetadata, BadRequestException, ValidationPipe, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
    public async transform(value: any, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata);
        } catch (e) {
            if (e instanceof BadRequestException) {
                const response = e.getResponse() as any;
                throw new UnprocessableEntityException(this.handleError(response));
            }
        }
    }

    private handleError(response: any) {
        console.log(response);
        if (typeof response === 'object' && Array.isArray(response.message)) {
            if (typeof response.message[0] === 'string') {
                return response.message.map(msg => ({
                    messages: [msg],
                }));
            }

            // If message is an array of objects, process as expected
            return response.message.map(error => ({
                field: error.property,
                messages: error.constraints ? Object.values(error.constraints) : ["Validation failed"],
            }));
        }

        return response;
    }


}

import { BadRequestException, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';
import { PaginationResponseInterface, ResponseApi, ResponseInterface } from '../utils/response.utils';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    //pagination
    @ApiResponse({
        status: 200,
        type: ProductEntity,
        isArray: true,
        schema: {
            $ref: getSchemaPath(ProductEntity),
        },
    })
    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseInterface<ProductEntity>> {
        const user = await this.productService.findById(id);
        if (!user) {
            throw new BadRequestException('Invalid product id');
        }
        return ResponseApi.successResponse<ProductEntity>('item retrived successfuly', 200, user)
    }

    @Get('')
    async findAll(@Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number): Promise<PaginationResponseInterface<ProductEntity[]>> {
        const users = await this.productService.findAll(page, limit);
        return ResponseApi.paginateResponse<ProductEntity[]>('item retrived successfuly', 200, users, page, limit)
    }
}

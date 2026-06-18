import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/updateStatus.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.create(createOrderDto);
    }

    @Get()
    async findAll() {
        return await this.orderService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.orderService.findOne(id);
    };

    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
        return await this.orderService.updateStatus(id, updateOrderStatusDto);
    }
}

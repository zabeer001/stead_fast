<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Apple iPhone 14',
                'description' => 'Latest model with A15 chip and advanced camera.',
                'image' => 'images/products/iphone14.jpg',
                'purchase_price' => 678,
                'price' => 999.99,
                'category_id' => 1, // Ensure this ID exists in your categories table
                'status' => 'active',
                'stock_quantity' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Samsung Galaxy S23',
                'description' => 'Flagship Android phone with stunning display.',
                'image' => 'images/products/galaxys23.jpg',
                'purchase_price' => 123,
                'price' => 899.99,
                'category_id' => 1,
                'status' => 'active',
                'stock_quantity' => 70,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sony WH-1000XM5',
                'description' => 'Industry leading noise-canceling headphones.',
                'image' => 'images/products/sonyheadphones.jpg',
                'purchase_price' => 78,
                'price' => 349.99,
                'category_id' => 2,
                'status' => 'active',
                'stock_quantity' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

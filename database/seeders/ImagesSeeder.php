<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Images;
class ImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \faker\Factory::create();
        for ($i = 0; $i <5; $i++){
            Images::create([
                'album'=>'just added',
                'file'=>$faker->imageUrl(360,360),
                'date'=>$faker->date
            ]);
        }
    }
}

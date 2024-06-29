<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Images;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index(Request $request)
{
    // Ambil parameter album dari request
    $album = $request->input('album');

    // Query gambar berdasarkan album jika parameter album diberikan
    $imagesQuery = Images::query();
    if ($album) {
        $imagesQuery->where('album', $album);
    }

    // Dapatkan hasil query
    $images = $imagesQuery->get()->map(function($image) {
        return [
            'id' => $image->id,
            'album' => $image->album,
            'file' => ($image->file),
            'date' => $image->date,
        ];
    });

    // Kembalikan hasil ke view
    return Inertia::render('Gallery', [
        'images' => $images,
    ]);
}

    public function upload(Request $request)
    {
        
        $request->validate([
            'album' => 'required|string',
            'image' => 'required|image'
        ]);
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/files', $filename);
            $c = Images::create([
                'album' => $request->album,
                'date' => time(),
                'file' => $path
            ]);

            return response()->json($c, 201);
        }

        return response()->json(['message' => 'File not found'], 400);
    }
    public function delete($id){
        $image = Images::destroy($id);
        return response()->json($image, 204);
    }
    public function move(Request $r, $id)
    {
        $image = Images::find($id);
        $image->update($r->all());
        return response()->json($r, 200);
    }
}

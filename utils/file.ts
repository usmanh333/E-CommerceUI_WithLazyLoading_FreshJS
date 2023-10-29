export const IMAGE_DIR = 'images';
export const FILE_API = '/api/file-stream';

export function showFile(image:string) {
    return `${FILE_API}/?file=${image}`;
}

export async function fileUpload(file:File) {
    const isExist = await exists(IMAGE_DIR);
    if (!isExist) {
        Deno.mkdir(IMAGE_DIR);
    }

    const arrBBuffer = await file?.arrayBuffer();
    const uintAABuffer = new Uint8Array(arrBBuffer);
    const filename = `${Date.now()}-${file?.name}`;
    Deno.writeFile(`${IMAGE_DIR}/${filename}`, uintAABuffer, {
        create: true
    })
    return filename;
}

export async function deleteFile(file:string) {
    try {
        const isExist = await exists(`${IMAGE_DIR}/${file}`);
        if (isExist) {
            Deno.remove(`${IMAGE_DIR}/${file}`);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function exists(path:string) {
    try {
        await Deno.stat(path);
        return true;
    } catch (_error) {
        return false;
    }
}
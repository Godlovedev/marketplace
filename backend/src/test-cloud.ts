import 'dotenv/config';
import cloudinary from "./config/cloundinary";

async function test() {
  console.log('Cloudinary configuré !', cloudinary.config());
}

test();
# Timeless Seeds artwork

The app includes illustrations for all 111 seeds, with matching Day and Starlight paintings except where the source's lighting or time sequence carries meaning. The approved background fade remains in place.

Production WebP exports at 480, 960 and 1440px are committed in `public/assets/timeless-seeds/`. These are sufficient to build and deploy the complete app. Large original PNG masters remain in the local authoring workspace and are not required by GitHub Pages.

The `seed-illustrations/production-queue.json` file records each scene's source, intended meaning, constraints, caption and lighting policy. The `records/` files contain prompts, alt text and visual review decisions for the 207 masters added in the final production pass. The first batch is recorded in `generation-manifest.json`. Local generation identifiers are historical provenance, not remote download links.

Most scenes keep the same composition when switching to Starlight. Seeds 6, 7, 70 and 73 keep their source-specific lighting; seeds 46, 67 and 95 use manually selected time sequences. Seeds 48 and 69 use the existing paired coastal paintings. No original book wording is part of a generated image.

To re-export artwork, restore the original PNG files under `artwork/timeless-seeds/seed-illustrations/`, install Pillow in a Python environment, and run `python3 scripts/sync-seed-illustrations.py`. The script includes only approved complete entries and updates the generated app mapping and export inventory.

Run `npm run check:seeds` to verify the original 111 entries and 117 source notes, source PDF hash, complete illustration coverage, responsive assets, appearance settings and source-specific lighting. GitHub Pages runs these checks before publishing.

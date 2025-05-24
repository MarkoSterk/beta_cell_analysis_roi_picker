## Installation

### From Source

Clone the repository and create the environment:
Required  uv (https://docs.astral.sh/uv/getting-started/installation/) and npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
```bash
git clone https://github.com/MarkoSterk/beta_cell_analysis_roi_picker.git
cd beta_cell_analysis_roi_picker
uv --project pyproject.toml
un run run.py
```

### Download executable from OneDrive

Download the application as an executable from the OneDrive shared folder:
https://1drv.ms/f/c/0a20237c38c0098c/EjeDwAtYvmtDoaIiw37WKfEBR6S_Ejdj7akehRAsX3K4fg?e=3JVXrg

- **Windows:** Download the `RoiPicker_win.zip` zip archive.
- **MacOS:** Download the `RoiPicker_macos.app.zip` app archive.
- **MacOS:** Download the `RoiPicker_macos.zip` zip archive.

Once you download the selected zip archive uncompress and use it by double-clicking the executable
RoiPicker_win.exe (Windows) or RoiPicker_macos (MacOS)

First a terminal window will open and then the actual application window will start. Since the application 
is still in the testing phase the terminal window can be used to monitor the application and report
any potential bugs. **If you find any bugs, please report them in the Issues section of the github repositorty**.

#### Test data
The onedrive folder also contains a test `.lif` file called `Experiment3-rampa.lif`which can be used for testing.

---

## Requirements

- At least 16 GB of RAM (recommended 24 GB)
- At least 15 GB of free disk space
- A modern, high-performance processor (tested on 10th gen i7 and M3 processors)

---

## Basic Usage

1. **Start or Open a Project**  
   - To begin with existing data, choose _File → Open Project_ and select your saved `.pkl` file.  
   - To load a new dataset, choose _File → Import LIF_ and pick your `.lif` file (or click on the large button on the main screen).  

2. **Set Your Preferences**  
The app tries to load the following meta data from the provided `.lif` file. If this is unsuccessful you can set
those parameters manully with:
   - Open _Preferences_ from the menu bar.  
   - Enter your **Project Name**.  
   - Specify the **Sampling Rate** (Hz) for your time-series data.  
   - If needed, enter the **Coordinate transform** (µm/px) coefficient to convert pixels to micrometers.  
   - Click ✓ to save.  

3. **Select Regions of Interest (ROIs)**  
   - Play or scrub the video to the desired frame.  
   - Adjust playback speed as needed.  
   - Right-click and drag on the video display (upper/left) or mean frame (lower/right) to draw an ellipse for each ROI.  
   - To remove an ROI, hold down `D` and left-click on it.  

4. **View Time Series**  
   - The **upper graph** on the right shows time series for all selected cells.  
   - The **lower graph** shows time series for the most recently selected ROI (or any ROI you right-click).  

5. **Export Cell Data**  
   - Click _File → Export → Time Series_ to save all ROIs' time series as a `.txt` file.  
   - Click _File → Export → Coordinates_ to save each ROI's x,y positions as a `.txt` file.  

6. **Add Quick Notes**  
   - Click the 📝 icon on the toolbar (far-right of the menu) to open the Quick Notes panel.  
   - Type observations (e.g., tissue drift, multiple islets, response quality).  
   - Click ✓ to save your notes.  

7. **Save Notes as PDF**  
   - In the Quick Notes panel, click the 💾 icon to export notes as a `.pdf` file.  

8. **Save or Export the Project**  
   - Choose _File → Save Project_ to bundle video data, preferences, ROIs, and notes into a `.pkl` file.  

9. **Start a New Project**  
   - With any project open, choose _File → New Project_ and repeat steps 1–8.

---

## For Developers

This project is open-source under the MIT License and can be modified or redistributed at will. To develop:

1. Clone or download the repository.
2. Create the Python backend environment:
   ```bash
   uv --project pyproject.toml
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. **Backend:** Uses **PyJolt** (async-first python web framework https://pypi.org/project/pyjolt/) with **PyWebView** (https://pypi.org/project/pywebview/).
5. **Frontend:** Built with **Jolt-ui** (JavaScript single-page framework https://www.npmjs.com/package/jolt-ui).
6. To repackage into an executable:
   - **macOS:** `uv run pyinstaller RoiPicker_macos.spec --distpath dist/macos --noconfirm`
   - **Windows:** `uv run pyinstaller RoiPicker_win.spec --distpath dist/windows --noconfirm`
   - Or use the CLI command from `pyinstaller_command.txt`.

The commands package the application as an executable into the dist/ folder for the specified platform.

---

## License

Copyright 2025 © Marko Šterk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_submodules

hiddenimports = []
hiddenimports += collect_submodules('reportlab.graphics.barcode')


a = Analysis(
    ['run_prod.py'],
    pathex=[],
    binaries=[],
    datas=[('backend/static', 'backend/static'), ('backend/logs', 'backend/logs'), ('backend/templates', 'backend/templates'), ('backend/static/temp_files', 'backend/static/temp_files')],
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='RoiPicker',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='RoiPicker',
)
app = BUNDLE(
    coll,
    name='RoiPicker.app',
    icon=None,
    bundle_identifier=None,
)

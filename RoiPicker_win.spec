# spec_win.spec

# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.utils.hooks import collect_submodules

block_cipher = None

# Dynamically collect submodules
torch_modules = collect_submodules('torch')
torchvision_modules = collect_submodules('torchvision')
torch_numpy_modules = collect_submodules('torch._numpy')
reportlab_modules = collect_submodules('reportlab.graphics.barcode')

a = Analysis(
    ['run_prod.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('backend/static', 'backend/static'),
        ('backend/logs', 'backend/logs'),
        ('backend/templates', 'backend/templates'),
        ('backend/static/temp_files', 'backend/static/temp_files'),
        ('RoiPicker_win.exe.config', '.'),
    ],
    hiddenimports=[
        *reportlab_modules,
        *torch_modules,
        *torchvision_modules,
        *torch_numpy_modules
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='RoiPicker_win',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,  # Change to False for --windowed
    disable_windowed_traceback=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='RoiPicker_win'
)

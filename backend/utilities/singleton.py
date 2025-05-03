"""
Singleton class decorator
"""
import functools

def singleton(cls):
    """Decorator that makes a class a Singleton by storing one shared instance."""
    instances = {}
    @functools.wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            # First time: create and store the single instance
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance
